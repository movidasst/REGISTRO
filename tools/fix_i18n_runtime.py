from pathlib import Path

INDEX = Path('index.html')
I18N = Path('i18n.js')

index = INDEX.read_text(encoding='utf-8')
old_select = '<select id="languageSelect" aria-label="Cambiar idioma"'
new_select = '<select id="languageSelect" aria-label="Cambiar idioma" onchange="window.movidaI18n && window.movidaI18n.setLanguage(this.value)"'
if new_select not in index:
    if old_select not in index:
        raise RuntimeError('language selector anchor not found')
    index = index.replace(old_select, new_select, 1)

old_src = '<script src="/i18n.js"></script>'
new_src = '<script src="./i18n.js?v=20260909-3"></script>'
if new_src not in index:
    if old_src not in index:
        raise RuntimeError('i18n script anchor not found')
    index = index.replace(old_src, new_src, 1)

INDEX.write_text(index, encoding='utf-8')

js = I18N.read_text(encoding='utf-8')
js = js.replace(
    "if (!SUPPORTED.includes(lang) || lang === currentLang) return;",
    "if (!SUPPORTED.includes(lang)) return;",
    1,
)

old_init = """  document.addEventListener('DOMContentLoaded', () => {\n    const selector = document.getElementById('languageSelect');\n    if (selector) {\n      selector.value = currentLang;\n      selector.addEventListener('change', event => setLanguage(event.target.value));\n    }\n    apply(document);\n    startObserver();\n    setTimeout(() => {\n      refreshCountrySelect();\n      refreshPhoneUi();\n    }, 500);\n  });\n\n  window.addEventListener('load', () => {\n    setTimeout(() => {\n      apply(document);\n      refreshCountrySelect();\n      refreshPhoneUi();\n    }, 250);\n  });\n"""
new_init = """  function initLanguageUI() {\n    const selector = document.getElementById('languageSelect');\n    if (selector) {\n      selector.value = currentLang;\n      if (selector.dataset.i18nBound !== '1') {\n        selector.addEventListener('change', event => setLanguage(event.target.value));\n        selector.dataset.i18nBound = '1';\n      }\n    }\n    apply(document);\n    startObserver();\n    setTimeout(() => {\n      refreshCountrySelect();\n      refreshPhoneUi();\n    }, 100);\n  }\n\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', initLanguageUI, { once: true });\n  } else {\n    initLanguageUI();\n  }\n\n  window.addEventListener('load', () => {\n    setTimeout(initLanguageUI, 0);\n  }, { once: true });\n\n  window.addEventListener('pageshow', () => {\n    setTimeout(initLanguageUI, 0);\n  });\n"""

if new_init not in js:
    if old_init not in js:
        raise RuntimeError('i18n init anchor not found')
    js = js.replace(old_init, new_init, 1)

I18N.write_text(js, encoding='utf-8')

assert './i18n.js?v=20260909-3' in index
assert 'onchange="window.movidaI18n && window.movidaI18n.setLanguage(this.value)"' in index
assert "function initLanguageUI()" in js
assert "if (!SUPPORTED.includes(lang)) return;" in js
assert ".rpc('registrar_integrante_internacional'" in index
assert "action: 'send_registration_email'" in index
assert "action: 'upload_registration_photo'" in index
print('runtime i18n fix applied safely')
