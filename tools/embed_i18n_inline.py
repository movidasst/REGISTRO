from pathlib import Path

index_path = Path('index.html')
i18n_path = Path('i18n.js')

index = index_path.read_text(encoding='utf-8')
i18n = i18n_path.read_text(encoding='utf-8')

old_tags = [
    '<script src="./i18n.js?v=20260909-3"></script>',
    '<script src="/i18n.js"></script>',
    '<script src="./i18n.js"></script>',
]

anchor = next((tag for tag in old_tags if tag in index), None)
if not anchor:
    if '<!-- MOVIDA_I18N_INLINE_START -->' in index:
        print('Inline i18n already embedded')
        raise SystemExit(0)
    raise RuntimeError('Could not find i18n script include')

inline = (
    '<!-- MOVIDA_I18N_INLINE_START -->\n'
    '<script>\n' + i18n + '\n</script>\n'
    '<!-- MOVIDA_I18N_INLINE_END -->'
)
index = index.replace(anchor, inline, 1)

# Direct, dependency-free selector call. This global alias is defined by the
# inline block before the main registration script runs.
old_handler = 'onchange="window.movidaI18n && window.movidaI18n.setLanguage(this.value)"'
new_handler = 'onchange="window.movidaI18n?.setLanguage(this.value)"'
if old_handler in index:
    index = index.replace(old_handler, new_handler, 1)

# Safety: backend/data-flow anchors must remain present.
required = [
    ".rpc('registrar_integrante_internacional'",
    "action: 'upload_registration_photo'",
    "action: 'send_registration_email'",
    "tipo_documento: paisIso2 === 'VE' ? 'Cédula' : 'Documento de identidad'",
    "paisNombre.value = nombrePais(iso2);",
    'id="languageSelect"',
    'MOVIDA_I18N_INLINE_START',
]
for needle in required:
    if needle not in index:
        raise RuntimeError(f'Safety anchor missing after embed: {needle}')

index_path.write_text(index, encoding='utf-8')
print('Embedded i18n inline safely')
