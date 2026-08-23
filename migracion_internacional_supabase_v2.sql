begin;

create extension if not exists pgcrypto;

alter table public.integrantes
  alter column cedula type text using cedula::text;

alter table public.integrantes
  add column if not exists pais_iso2 text,
  add column if not exists pais_nombre text,
  add column if not exists tipo_documento text,
  add column if not exists documento text,
  add column if not exists telefono_e164 text,
  add column if not exists telefono_pais_iso2 text,
  add column if not exists public_id uuid default gen_random_uuid();

alter table public.integrantes drop constraint if exists integrantes_telefono_e164_check;

alter table public.integrantes
  alter column telefono_e164 type text using nullif(trim(telefono_e164::text), ''),
  alter column telefono_pais_iso2 type text using nullif(upper(trim(telefono_pais_iso2::text)), '');

update public.integrantes
set pais_iso2 = coalesce(nullif(upper(trim(pais_iso2)), ''), 'VE'),
    pais_nombre = coalesce(nullif(trim(pais_nombre), ''), 'Venezuela'),
    tipo_documento = coalesce(nullif(trim(tipo_documento), ''), 'Cédula'),
    documento = coalesce(nullif(upper(trim(documento)), ''), upper(trim(cedula))),
    telefono_e164 = case
      when nullif(trim(telefono_e164), '') ~ '^[+][1-9][0-9]{6,14}$'
        then trim(telefono_e164)
      when regexp_replace(coalesce(wasap::text, ''), '\D', '', 'g') ~ '^584[0-9]{9}$'
        then '+' || regexp_replace(wasap::text, '\D', '', 'g')
      when regexp_replace(coalesce(wasap::text, ''), '\D', '', 'g') ~ '^04[0-9]{9}$'
        then '+58' || substr(regexp_replace(wasap::text, '\D', '', 'g'), 2)
      else null
    end,
    telefono_pais_iso2 = case
      when coalesce(nullif(trim(telefono_e164), ''), nullif(regexp_replace(coalesce(wasap::text, ''), '\D', '', 'g'), '')) is not null
        then coalesce(nullif(upper(trim(telefono_pais_iso2)), ''), 'VE')
      else null
    end,
    public_id = coalesce(public_id, gen_random_uuid());

alter table public.integrantes
  alter column pais_iso2 set default 'VE',
  alter column pais_iso2 set not null,
  alter column documento set not null,
  alter column public_id set not null;

alter table public.integrantes drop constraint if exists integrantes_pais_iso2_check;
alter table public.integrantes add constraint integrantes_pais_iso2_check check (pais_iso2 ~ '^[A-Z]{2}$');

update public.integrantes
set telefono_e164 = null,
    telefono_pais_iso2 = null
where telefono_e164 is not null
  and trim(telefono_e164) !~ '^[+][1-9][0-9]{6,14}$';

update public.integrantes
set telefono_e164 = trim(telefono_e164)
where telefono_e164 is not null;

alter table public.integrantes add constraint integrantes_telefono_e164_check
  check (telefono_e164 is null or telefono_e164 ~ '^[+][1-9][0-9]{6,14}$') not valid;
alter table public.integrantes drop constraint if exists integrantes_ubicacion_check;
alter table public.integrantes add constraint integrantes_ubicacion_check check (
  pais_iso2 <> 'VE' or (nullif(trim(estado), '') is not null and nullif(trim(municipio), '') is not null)
);

do $$
declare r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    join pg_class t on t.oid = c.conrelid
    join pg_namespace n on n.oid = t.relnamespace
    where n.nspname = 'public' and t.relname = 'integrantes' and c.contype = 'u'
      and pg_get_constraintdef(c.oid) ~* '^UNIQUE \(cedula\)$'
  loop execute format('alter table public.integrantes drop constraint %I', r.conname); end loop;
end $$;

drop index if exists public.integrantes_pais_documento_uidx;
create unique index if not exists integrantes_documento_uidx
  on public.integrantes (upper(trim(documento)));
create unique index if not exists integrantes_public_id_uidx on public.integrantes (public_id);

create or replace function public.registrar_integrante_internacional(p_datos jsonb)
returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.integrantes; v_pais text; v_documento text; v_codigo text;
begin
  v_pais := upper(coalesce(nullif(trim(p_datos->>'pais_iso2'), ''), 'VE'));
  v_documento := upper(trim(coalesce(p_datos->>'documento', p_datos->>'cedula', '')));
  if v_documento = '' then raise exception 'El documento de identidad es obligatorio'; end if;
  if coalesce(p_datos->>'telefono_e164', '') !~ '^[+][1-9][0-9]{6,14}$' then
    raise exception 'El número de WhatsApp debe ser internacional y válido';
  end if;
  if v_pais = 'VE' and (nullif(trim(p_datos->>'estado'), '') is null or nullif(trim(p_datos->>'municipio'), '') is null) then
    raise exception 'Estado y municipio son obligatorios para Venezuela';
  end if;
  loop
    v_codigo := upper(substr(encode(gen_random_bytes(5), 'hex'), 1, 5));
    exit when not exists (select 1 from public.integrantes where codigo_integrante = v_codigo);
  end loop;
  insert into public.integrantes (
    nombres, apellidos, cedula, documento, tipo_documento, pais_iso2, pais_nombre,
    edad, genero, estado, municipio, wasap, telefono_e164, telefono_pais_iso2,
    whatsapp_username, correo, grado, laboral, carrera, postgrado, doctorado, linkedin,
    codigo_integrante, public_id
  ) values (
    trim(p_datos->>'nombres'), trim(p_datos->>'apellidos'), v_documento, v_documento,
    coalesce(nullif(trim(p_datos->>'tipo_documento'), ''), 'Documento de identidad'), v_pais,
    coalesce(nullif(trim(p_datos->>'pais_nombre'), ''), v_pais),
    (p_datos->>'edad')::int, p_datos->>'genero', nullif(trim(p_datos->>'estado'), ''),
    nullif(trim(p_datos->>'municipio'), ''), regexp_replace(coalesce(p_datos->>'wasap',''), '\D','','g'),
    nullif(trim(p_datos->>'telefono_e164'), ''), upper(nullif(trim(p_datos->>'telefono_pais_iso2'), '')),
    nullif(trim(p_datos->>'whatsapp_username'), ''), lower(trim(p_datos->>'correo')),
    p_datos->>'grado', p_datos->>'laboral', p_datos->>'carrera', nullif(p_datos->>'postgrado',''),
    nullif(p_datos->>'doctorado',''), nullif(p_datos->>'linkedin',''), v_codigo, gen_random_uuid()
  ) returning * into r;
  return (to_jsonb(r) - 'codigo_integrante') || jsonb_build_object('codigo_integrante', v_codigo);
exception when unique_violation then
  raise exception 'Ya existe un integrante registrado con ese documento de identidad';
end $$;

create or replace function public.acceso_integrante_internacional(p_pais_iso2 text, p_documento text, p_codigo text)
returns jsonb language sql security definer set search_path = public as $$
  select to_jsonb(i) - 'codigo_integrante'
  from public.integrantes i
  where i.pais_iso2 = upper(trim(p_pais_iso2))
    and upper(trim(i.documento)) = upper(trim(p_documento))
    and upper(i.codigo_integrante) = upper(trim(p_codigo))
  limit 1;
$$;

create or replace function public.actualizar_integrante_internacional(
  p_pais_iso2 text, p_documento text, p_codigo text, p_datos jsonb
) returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.integrantes; v_nuevo_pais text;
begin
  v_nuevo_pais := upper(coalesce(nullif(trim(p_datos->>'pais_iso2'), ''), p_pais_iso2));
  if coalesce(p_datos->>'telefono_e164', '') !~ '^[+][1-9][0-9]{6,14}$' then
    raise exception 'El número de WhatsApp debe ser internacional y válido';
  end if;
  if v_nuevo_pais = 'VE' and (nullif(trim(p_datos->>'estado'), '') is null or nullif(trim(p_datos->>'municipio'), '') is null) then
    raise exception 'Estado y municipio son obligatorios para Venezuela';
  end if;
  update public.integrantes i set
    edad = coalesce((p_datos->>'edad')::int, i.edad), pais_iso2 = v_nuevo_pais,
    pais_nombre = coalesce(nullif(trim(p_datos->>'pais_nombre'), ''), i.pais_nombre),
    estado = nullif(trim(p_datos->>'estado'), ''), municipio = nullif(trim(p_datos->>'municipio'), ''),
    laboral = coalesce(nullif(p_datos->>'laboral',''), i.laboral), correo = coalesce(nullif(lower(trim(p_datos->>'correo')),''), i.correo),
    wasap = coalesce(nullif(regexp_replace(coalesce(p_datos->>'wasap',''), '\D','','g'),''), i.wasap::text),
    telefono_e164 = coalesce(nullif(trim(p_datos->>'telefono_e164'),''), i.telefono_e164),
    telefono_pais_iso2 = coalesce(nullif(upper(trim(p_datos->>'telefono_pais_iso2')),''), i.telefono_pais_iso2),
    mostrar_wasap = coalesce((p_datos->>'mostrar_wasap')::boolean, i.mostrar_wasap),
    whatsapp_username = nullif(trim(p_datos->>'whatsapp_username'),''),
    mostrar_whatsapp_username = coalesce((p_datos->>'mostrar_whatsapp_username')::boolean, i.mostrar_whatsapp_username),
    linkedin = nullif(trim(p_datos->>'linkedin'),''), grado = coalesce(nullif(p_datos->>'grado',''),i.grado),
    carrera = coalesce(nullif(p_datos->>'carrera',''),i.carrera), postgrado = nullif(p_datos->>'postgrado',''), doctorado = nullif(p_datos->>'doctorado','')
  where i.pais_iso2 = upper(trim(p_pais_iso2)) and upper(trim(i.documento)) = upper(trim(p_documento))
    and upper(i.codigo_integrante) = upper(trim(p_codigo)) returning * into r;
  if not found then return null; end if;
  return to_jsonb(r) - 'codigo_integrante';
end $$;

create or replace function public.verificar_credencial_internacional(p_consulta text, p_pais_iso2 text default null)
returns jsonb language sql security definer set search_path = public as $$
  select jsonb_build_object(
    'public_id', i.public_id, 'nombres', i.nombres, 'apellidos', i.apellidos,
    'documento', i.documento, 'tipo_documento', i.tipo_documento,
    'pais_iso2', i.pais_iso2, 'pais_nombre', i.pais_nombre, 'estado', i.estado, 'municipio', i.municipio,
    'grado', i.grado, 'carrera', i.carrera, 'foto_url', i.foto_url,
    'wasap', case when coalesce(i.mostrar_wasap,false) then i.wasap else null end,
    'telefono_e164', case when coalesce(i.mostrar_wasap,false) then i.telefono_e164 else null end
  ) from public.integrantes i
  where (p_consulta ~* '^[0-9a-f-]{36}$' and i.public_id = p_consulta::uuid)
     or (not (p_consulta ~* '^[0-9a-f-]{36}$') and i.pais_iso2 = upper(coalesce(p_pais_iso2,'VE')) and upper(trim(i.documento)) = upper(trim(p_consulta)))
  limit 1;
$$;

create or replace function public.cambiar_codigo_integrante_internacional(
  p_pais_iso2 text, p_documento text, p_codigo_actual text, p_codigo_nuevo text
) returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.integrantes;
begin
  if p_codigo_nuevo !~ '^[A-Z0-9]{5}$' then raise exception 'El nuevo código debe tener 5 letras o números'; end if;
  if exists (select 1 from public.integrantes where upper(codigo_integrante)=upper(p_codigo_nuevo)) then raise exception 'Ese código ya está en uso'; end if;
  update public.integrantes i set codigo_integrante=upper(p_codigo_nuevo)
  where i.pais_iso2=upper(p_pais_iso2) and upper(trim(i.documento))=upper(trim(p_documento))
    and upper(i.codigo_integrante)=upper(p_codigo_actual) returning * into r;
  if not found then return null; end if;
  return to_jsonb(r)-'codigo_integrante';
end $$;

create or replace function public.actualizar_foto_integrante_internacional(
  p_pais_iso2 text, p_documento text, p_codigo text, p_foto_url text
) returns jsonb language plpgsql security definer set search_path = public as $$
declare r public.integrantes;
begin
  if coalesce(trim(p_foto_url),'') !~ '^https://' then raise exception 'URL de fotografía inválida'; end if;
  update public.integrantes i set foto_url=trim(p_foto_url)
  where i.pais_iso2=upper(trim(p_pais_iso2))
    and upper(trim(i.documento))=upper(trim(p_documento))
    and upper(i.codigo_integrante)=upper(trim(p_codigo)) returning * into r;
  if not found then return null; end if;
  return to_jsonb(r)-'codigo_integrante';
end $$;

create or replace function public.directorio_internacional_v1()
returns setof jsonb language sql security definer set search_path = public as $$
  select jsonb_build_object(
    'nombres', i.nombres, 'apellidos', i.apellidos, 'edad', i.edad, 'genero', i.genero,
    'pais_iso2', i.pais_iso2, 'pais_nombre', i.pais_nombre, 'estado', i.estado, 'municipio', i.municipio,
    'grado', i.grado, 'carrera', i.carrera, 'postgrado', i.postgrado, 'doctorado', i.doctorado,
    'laboral', i.laboral, 'foto_url', i.foto_url, 'linkedin', i.linkedin,
    'correo', i.correo,
    'wasap', case when coalesce(i.mostrar_wasap,false) then i.wasap else null end,
    'telefono_e164', case when coalesce(i.mostrar_wasap,false) then i.telefono_e164 else null end,
    'whatsapp_username', case when coalesce(i.mostrar_whatsapp_username,true) then i.whatsapp_username else null end,
    'mostrar_wasap', coalesce(i.mostrar_wasap,false),
    'mostrar_whatsapp_username', coalesce(i.mostrar_whatsapp_username,true)
  ) from public.integrantes i;
$$;

revoke all on function public.registrar_integrante_internacional(jsonb) from public;
revoke all on function public.acceso_integrante_internacional(text,text,text) from public;
revoke all on function public.actualizar_integrante_internacional(text,text,text,jsonb) from public;
grant execute on function public.registrar_integrante_internacional(jsonb) to anon, authenticated;
grant execute on function public.acceso_integrante_internacional(text,text,text) to anon, authenticated;
grant execute on function public.actualizar_integrante_internacional(text,text,text,jsonb) to anon, authenticated;
grant execute on function public.verificar_credencial_internacional(text,text) to anon, authenticated;
grant execute on function public.cambiar_codigo_integrante_internacional(text,text,text,text) to anon, authenticated;
grant execute on function public.actualizar_foto_integrante_internacional(text,text,text,text) to anon, authenticated;
grant execute on function public.directorio_internacional_v1() to anon, authenticated;

commit;

select upper(trim(documento)) as documento, count(*)
from public.integrantes
group by 1
having count(*) > 1;

select documento, wasap, telefono_e164
from public.integrantes
where telefono_e164 is not null
  and telefono_e164 !~ '^[+][1-9][0-9]{6,14}$';
