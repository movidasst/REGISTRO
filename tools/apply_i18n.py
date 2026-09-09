from pathlib import Path

INDEX = Path('index.html')
I18N = Path('i18n.js')


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise RuntimeError(f'Anchor not found for {label}')
    return text.replace(old, new, 1)


index = INDEX.read_text(encoding='utf-8')

main_anchor = '    <main class="w-full max-w-5xl mx-auto px-3 sm:px-5 lg:px-8 pt-[7.2rem] sm:pt-[8.2rem] pb-8 mt-2 flex-grow">\n'
language_bar = '''    <main class="w-full max-w-5xl mx-auto px-3 sm:px-5 lg:px-8 pt-[7.2rem] sm:pt-[8.2rem] pb-8 mt-2 flex-grow">\n        <!-- Selector multidioma: solo cambia la presentación; los valores enviados al backend permanecen canónicos. -->\n        <div id="languageBar" class="mb-3 flex justify-end">\n            <div class="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-movida-teal/20 bg-white px-2.5 py-1.5 shadow-sm">\n                <i class="fa-solid fa-language text-movida-teal" aria-hidden="true"></i>\n                <select id="languageSelect" aria-label="Cambiar idioma" class="min-h-[36px] cursor-pointer appearance-auto rounded-xl border-0 bg-transparent px-1.5 text-sm font-black text-movida-blue outline-none focus:ring-2 focus:ring-movida-teal/20">\n                    <option value="es">Español</option>\n                    <option value="en">English</option>\n                    <option value="pt">Português</option>\n                    <option value="fr">Français</option>\n                </select>\n            </div>\n        </div>\n'''
index = replace_once(index, main_anchor, language_bar, 'language selector')

script_anchor = '    </main>\n\n    <script>\n'
script_insert = '    </main>\n\n    <script src="/i18n.js"></script>\n    <script>\n'
index = replace_once(index, script_anchor, script_insert, 'i18n script include')

country_function = '''        function nombrePais(iso2) {\n            try { return new Intl.DisplayNames(['es'], { type: 'region' }).of(String(iso2).toUpperCase()); }\n            catch (_) { return String(iso2).toUpperCase(); }\n        }\n'''
country_functions = '''        // Nombre canónico en español: se conserva para pais_nombre y compatibilidad con la base de datos.\n        function nombrePais(iso2) {\n            try { return new Intl.DisplayNames(['es'], { type: 'region' }).of(String(iso2).toUpperCase()); }\n            catch (_) { return String(iso2).toUpperCase(); }\n        }\n\n        // Nombre localizado: se usa únicamente en la interfaz.\n        function nombrePaisUI(iso2) {\n            return window.movidaI18n?.countryName(iso2) || nombrePais(iso2);\n        }\n'''
index = replace_once(index, country_function, country_functions, 'canonical/localized country names')

index = replace_once(
    index,
    ".sort((a, b) => nombrePais(a.iso2).localeCompare(nombrePais(b.iso2), 'es'));",
    ".sort((a, b) => nombrePaisUI(a.iso2).localeCompare(nombrePaisUI(b.iso2), window.movidaI18n?.locale() || 'es'));",
    'country sorting'
)
index = replace_once(
    index,
    "option.textContent = `${banderaPais(pais.iso2)} ${nombrePais(pais.iso2)}`;",
    "option.textContent = `${banderaPais(pais.iso2)} ${nombrePaisUI(pais.iso2)}`;",
    'country option labels'
)

phone_anchor = '''            telefonoIntl = window.intlTelInput(document.getElementById('wasap_mask'), {\n                initialCountry: 've',\n                separateDialCode: true,\n                nationalMode: true,\n                strictMode: true,\n                loadUtils: () => import('https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.2/build/js/utils.js')\n            });'''
phone_localized = '''            telefonoIntl = window.intlTelInput(document.getElementById('wasap_mask'), {\n                initialCountry: 've',\n                separateDialCode: true,\n                nationalMode: true,\n                strictMode: true,\n                countryNameLocale: window.movidaI18n?.locale() || 'es',\n                uiTranslations: window.movidaI18n?.phoneTranslations() || {},\n                loadUtils: () => import('https://cdn.jsdelivr.net/npm/intl-tel-input@25.12.2/build/js/utils.js')\n            });'''
index = replace_once(index, phone_anchor, phone_localized, 'telephone localization')

validity_old = "wInput.setCustomValidity('Ingresa un número de WhatsApp válido para el país seleccionado.');"
validity_new = "wInput.setCustomValidity(window.movidaI18n?.t('Ingresa un número de WhatsApp válido para el país seleccionado.') || 'Ingresa un número de WhatsApp válido para el país seleccionado.');"
index = replace_once(index, validity_old, validity_new, 'localized custom validity')

share_old = '''                    const customMsg =\n                        `¡Ya soy integrante oficial de la red internacional de La Movida de SST Plus! 🌎 ` +\n                        `Tú también puedes formar parte de nuestro ecosistema de profesionales de SST. ` +\n                        `Regístrate aquí: https://registro.movidasst.com`;'''
share_new = '''                    const customMsg = window.movidaI18n?.shareMessage() ||\n                        `¡Ya soy integrante oficial de la red internacional de La Movida de SST Plus! 🌎 ` +\n                        `Tú también puedes formar parte de nuestro ecosistema de profesionales de SST. ` +\n                        `Regístrate aquí: https://registro.movidasst.com`;'''
index = replace_once(index, share_old, share_new, 'localized WhatsApp share message')

resize_anchor = '''        window.addEventListener('resize', () => {\n            updateHeight(currentStep);\n        });\n'''
resize_localized = '''        window.addEventListener('resize', () => {\n            updateHeight(currentStep);\n        });\n\n        window.addEventListener('movida:languagechange', () => {\n            setTimeout(() => updateHeight(currentStep), 60);\n        });\n'''
index = replace_once(index, resize_anchor, resize_localized, 'language-change height refresh')

INDEX.write_text(index, encoding='utf-8')

# Avoid a MutationObserver feedback loop when country options are re-ordered.
i18n = I18N.read_text(encoding='utf-8')
old_observer = '''      let needsCountryRefresh = false;\n      mutations.forEach(mutation => {\n        if (mutation.type === 'characterData') translateTextNode(mutation.target);\n        mutation.addedNodes?.forEach(node => {\n          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);\n          if (node.nodeType === Node.ELEMENT_NODE) {\n            apply(node);\n            if (node.id === 'pais' || node.closest?.('#pais') || node.querySelector?.('#pais')) needsCountryRefresh = true;\n          }\n        });\n      });\n      if (needsCountryRefresh) setTimeout(refreshCountrySelect, 0);\n      setTimeout(refreshPhoneUi, 0);'''
new_observer = '''      mutations.forEach(mutation => {\n        if (mutation.type === 'characterData') translateTextNode(mutation.target);\n        mutation.addedNodes?.forEach(node => {\n          if (node.nodeType === Node.TEXT_NODE) translateTextNode(node);\n          if (node.nodeType === Node.ELEMENT_NODE) apply(node);\n        });\n      });\n      setTimeout(refreshPhoneUi, 0);'''
i18n = replace_once(i18n, old_observer, new_observer, 'observer loop prevention')
I18N.write_text(i18n, encoding='utf-8')

# Safety assertions: canonical backend-facing values must remain unchanged.
assert "tipo_documento: paisIso2 === 'VE' ? 'Cédula' : 'Documento de identidad'" in index
assert "paisNombre.value = nombrePais(iso2);" in index
assert ".rpc('registrar_integrante_internacional'" in index
assert "action: 'send_registration_email'" in index
assert "action: 'upload_registration_photo'" in index
assert "value=\"Masculino\"" in index and "value=\"Femenino\"" in index
assert "value=\"Dependiente\"" in index and "value=\"Independiente\"" in index
assert 'id="languageSelect"' in index
assert '<script src="/i18n.js"></script>' in index

print('i18n patch applied safely')
