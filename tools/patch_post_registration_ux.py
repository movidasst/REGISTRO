from pathlib import Path
import re

INDEX = Path('index.html')
I18N = Path('i18n.js')


def replace_once(source: str, old: str, new: str, label: str) -> str:
    count = source.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected exactly one anchor, found {count}')
    return source.replace(old, new, 1)


def add_translations(source: str) -> str:
    additions = {
        "      'Unirse al Grupo Oficial de WhatsApp': 'Join the Official WhatsApp Group',\n":
            "      'Grupo de Estudio Venezuela': 'Venezuela Study Group',\n"
            "      'Grupos por Estados de Venezuela': 'Groups by Venezuelan State',\n",
        "      'Unirse al Grupo Oficial de WhatsApp': 'Entrar no Grupo Oficial do WhatsApp',\n":
            "      'Grupo de Estudio Venezuela': 'Grupo de Estudo Venezuela',\n"
            "      'Grupos por Estados de Venezuela': 'Grupos por Estados da Venezuela',\n",
        "      'Unirse al Grupo Oficial de WhatsApp': 'Rejoindre le groupe WhatsApp officiel',\n":
            "      'Grupo de Estudio Venezuela': 'Groupe d’étude Venezuela',\n"
            "      'Grupos por Estados de Venezuela': 'Groupes par État du Venezuela',\n",
        "      'Creando registro...': 'Creating registration...',\n":
            "      'Estamos procesando tu registro': 'We are processing your registration',\n"
            "      'Por favor espera unos segundos. Estamos guardando tus datos, subiendo tu fotografía y preparando tu acceso.': 'Please wait a few seconds. We are saving your data, uploading your photo, and preparing your access.',\n"
            "      'No cierres ni recargues esta página mientras finalizamos.': 'Do not close or reload this page while we finish.',\n",
        "      'Creando registro...': 'Criando registro...',\n":
            "      'Estamos procesando tu registro': 'Estamos processando seu registro',\n"
            "      'Por favor espera unos segundos. Estamos guardando tus datos, subiendo tu fotografía y preparando tu acceso.': 'Aguarde alguns segundos. Estamos salvando seus dados, enviando sua foto e preparando seu acesso.',\n"
            "      'No cierres ni recargues esta página mientras finalizamos.': 'Não feche nem recarregue esta página enquanto finalizamos.',\n",
        "      'Creando registro...': 'Création de l’inscription...',\n":
            "      'Estamos procesando tu registro': 'Nous traitons votre inscription',\n"
            "      'Por favor espera unos segundos. Estamos guardando tus datos, subiendo tu fotografía y preparando tu acceso.': 'Veuillez patienter quelques secondes. Nous enregistrons vos données, téléversons votre photo et préparons votre accès.',\n"
            "      'No cierres ni recargues esta página mientras finalizamos.': 'Ne fermez pas et ne rechargez pas cette page pendant la finalisation.',\n",
    }
    for anchor, extra in additions.items():
        first_line = extra.splitlines()[0]
        if first_line in source:
            continue
        source = replace_once(source, anchor, anchor + extra, f'translation {anchor.strip()}')
    return source


def patch_index(text: str) -> str:
    if 'id="processingMsg"' not in text:
        anchor = '            <!-- Mensajes de estado y Gamificación de Recompensa (Neuro-UX) -->'
        block = '''            <div id="processingMsg" class="hidden m-6 mt-5 rounded-2xl border border-movida-teal/25 bg-gradient-to-r from-movida-teal/10 to-sky-50 p-4 shadow-sm" role="status" aria-live="polite" aria-busy="true">
                <div class="flex items-start gap-3">
                    <div class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-movida-teal shadow-sm">
                        <i class="fa-solid fa-circle-notch fa-spin text-xl" aria-hidden="true"></i>
                    </div>
                    <div class="min-w-0 text-left">
                        <h3 id="processingTitle" class="text-sm font-black text-movida-blue">Estamos procesando tu registro</h3>
                        <p class="mt-1 text-xs font-semibold leading-relaxed text-slate-600">Por favor espera unos segundos. Estamos guardando tus datos, subiendo tu fotografía y preparando tu acceso.</p>
                        <p class="mt-1.5 text-[0.7rem] font-black text-movida-teal"><i class="fa-solid fa-shield-halved mr-1" aria-hidden="true"></i>No cierres ni recargues esta página mientras finalizamos.</p>
                    </div>
                </div>
            </div>

'''
        text = replace_once(text, anchor, block + anchor, 'processing panel')

    if 'id="successWhatsappStatesGroup"' not in text:
        pattern = re.compile(
            r'                    <!-- Botón de unirse al grupo de WhatsApp \(Agregado para incentivo post-registro\) -->\n'
            r'                    <a id="successWhatsappGroup".*?</a>',
            re.S,
        )
        replacement = '''                    <!-- Accesos a grupos de WhatsApp según país -->
                    <a id="successWhatsappGroup" href="https://chat.whatsapp.com/LTCSym7zKlsKYsGaXc7pFK" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-transform transform active:scale-95 text-sm mb-2 cursor-pointer animate-pulse-subtle">
                        <i class="fa-brands fa-whatsapp text-lg"></i> <span id="successWhatsappGroupText">Grupo de Estudio Venezuela</span>
                    </a>

                    <a id="successWhatsappStatesGroup" href="https://chat.whatsapp.com/E3A0nzbY4TkE6WXsPI10nW" target="_blank" rel="noopener noreferrer" class="hidden w-full items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-[#128C4A] border-2 border-[#25D366]/40 font-black py-3.5 px-4 rounded-xl shadow-sm transition-transform transform active:scale-95 text-sm mb-2 cursor-pointer">
                        <i class="fa-brands fa-whatsapp text-lg"></i> <span>Grupos por Estados de Venezuela</span>
                    </a>'''
        text, count = pattern.subn(replacement, text, count=1)
        if count != 1:
            raise SystemExit(f'WhatsApp success button block: expected 1, found {count}')

    if 'const gruposEstadosWhatsapp =' not in text:
        old = '''            const grupoWhatsapp = document.getElementById('successWhatsappGroup');
            const grupoWhatsappTexto = document.getElementById('successWhatsappGroupText');
            if (grupoWhatsapp) {
                grupoWhatsapp.href = esVenezuela
                    ? 'https://chat.whatsapp.com/LTCSym7zKlsKYsGaXc7pFK'
                    : 'https://chat.whatsapp.com/DIU1Y140TMn81uTmG4u8OT';
            }
            if (grupoWhatsappTexto) {
                grupoWhatsappTexto.textContent = esVenezuela
                    ? 'Unirse al Grupo Oficial de WhatsApp'
                    : 'Unirse al Grupo La Movida SST Internacional';
            }
            successMsg.classList.remove('hidden');'''
        new = '''            const grupoWhatsapp = document.getElementById('successWhatsappGroup');
            const grupoWhatsappTexto = document.getElementById('successWhatsappGroupText');
            const gruposEstadosWhatsapp = document.getElementById('successWhatsappStatesGroup');
            if (grupoWhatsapp) {
                grupoWhatsapp.href = esVenezuela
                    ? 'https://chat.whatsapp.com/LTCSym7zKlsKYsGaXc7pFK'
                    : 'https://chat.whatsapp.com/DIU1Y140TMn81uTmG4u8OT';
            }
            if (grupoWhatsappTexto) {
                grupoWhatsappTexto.textContent = esVenezuela
                    ? 'Grupo de Estudio Venezuela'
                    : 'Unirse al Grupo La Movida SST Internacional';
            }
            if (gruposEstadosWhatsapp) {
                gruposEstadosWhatsapp.classList.toggle('hidden', !esVenezuela);
                gruposEstadosWhatsapp.classList.toggle('flex', esVenezuela);
            }
            document.getElementById('processingMsg')?.classList.add('hidden');
            successMsg.classList.remove('hidden');'''
        text = replace_once(text, old, new, 'country-specific WhatsApp logic')

    if "const processingMsg = document.getElementById" not in text:
        old = '''        const successMsg = document.getElementById('successMsg');
        const errorMsg = document.getElementById('errorMsg');'''
        new = '''        const successMsg = document.getElementById('successMsg');
        const errorMsg = document.getElementById('errorMsg');
        const processingMsg = document.getElementById('processingMsg');
        const processingTitle = document.getElementById('processingTitle');'''
        text = replace_once(text, old, new, 'processing constants')

    if 'processingMsg.scrollIntoView' not in text:
        old = '''                btnText.innerText = 'Creando registro...';
                btnSpinner.classList.remove('hidden');
                successMsg.classList.add('hidden');
                errorMsg.classList.add('hidden');

                let registroCreado = null;'''
        new = '''                btnText.innerText = 'Creando registro...';
                btnSpinner.classList.remove('hidden');
                successMsg.classList.add('hidden');
                errorMsg.classList.add('hidden');
                if (processingTitle) {
                    processingTitle.innerText = window.movidaI18n?.t('Estamos procesando tu registro') || 'Estamos procesando tu registro';
                }
                if (processingMsg) {
                    processingMsg.classList.remove('hidden');
                    setTimeout(() => processingMsg.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
                }

                let registroCreado = null;'''
        text = replace_once(text, old, new, 'processing start')

    if "processingTitle.innerText = window.movidaI18n?.t('Guardando fotografía...')" not in text:
        old = '''                    actualizarEstadoFoto('guardando');
                    btnText.innerText =
                        'Guardando fotografía...';'''
        new = '''                    actualizarEstadoFoto('guardando');
                    if (processingTitle) {
                        processingTitle.innerText = window.movidaI18n?.t('Guardando fotografía...') || 'Guardando fotografía...';
                    }
                    btnText.innerText =
                        'Guardando fotografía...';'''
        text = replace_once(text, old, new, 'photo processing stage')

    if "processingMsg?.classList.add('hidden');" not in text:
        old = '''                    btnSpinner.classList.add('hidden');

                    window.scrollTo({'''
        new = '''                    btnSpinner.classList.add('hidden');
                    processingMsg?.classList.add('hidden');

                    window.scrollTo({'''
        text = replace_once(text, old, new, 'processing cleanup')

    return add_translations(text)


def validate(index_text: str, i18n_text: str) -> None:
    required = [
        'id="processingMsg"',
        'Estamos procesando tu registro',
        'No cierres ni recargues esta página mientras finalizamos.',
        'id="successWhatsappStatesGroup"',
        'https://chat.whatsapp.com/LTCSym7zKlsKYsGaXc7pFK',
        'https://chat.whatsapp.com/E3A0nzbY4TkE6WXsPI10nW',
        'Grupo de Estudio Venezuela',
        'Grupos por Estados de Venezuela',
        "gruposEstadosWhatsapp.classList.toggle('hidden', !esVenezuela)",
        'processingMsg.scrollIntoView',
    ]
    for item in required:
        if item not in index_text:
            raise SystemExit(f'validation failed: {item}')
    required_i18n = [
        "'Grupo de Estudio Venezuela': 'Venezuela Study Group'",
        "'Grupos por Estados de Venezuela': 'Grupos por Estados da Venezuela'",
        "'Estamos procesando tu registro': 'Nous traitons votre inscription'",
    ]
    for item in required_i18n:
        if item not in i18n_text:
            raise SystemExit(f'i18n validation failed: {item}')


index_text = patch_index(INDEX.read_text(encoding='utf-8'))
i18n_text = add_translations(I18N.read_text(encoding='utf-8'))
validate(index_text, i18n_text)
INDEX.write_text(index_text, encoding='utf-8')
I18N.write_text(i18n_text, encoding='utf-8')
print('Registration UX patch applied and validated.')
