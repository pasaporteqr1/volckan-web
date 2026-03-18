// ===================================================
// CONFIGURACIÓN
// ===================================================
const SPREADSHEET_ID = '1VQaG51u4r_hVSgNlZKbkZsPucxL9f_BQa6q0vQVud6U';
const TELEGRAM_BOT_TOKEN = '8763231145:AAF8ChKkCK962cv2MitAuCu-rwjQEKTPw2w';
const TELEGRAM_CHAT_ID = '263768304';
const CALENDAR_ID = 'grupovolckan@gmail.com';

// ===================================================
// doGet — Devuelve slots ocupados (pasados + futuros)
// ===================================================
function doGet(e) {
  const action = e.parameter.action;

  if (action === 'getVisitas') {
    return getVisitas();
  }

  return ContentService.createTextOutput(JSON.stringify({ error: 'Acción no reconocida' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getVisitas() {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);

  // Buscar 6 meses atrás para mantener registro de visitas pasadas
  const pastLimit = new Date();
  pastLimit.setMonth(pastLimit.getMonth() - 6);

  // Buscar 3 meses adelante para reservas futuras
  const futureLimit = new Date();
  futureLimit.setMonth(futureLimit.getMonth() + 3);

  const events = calendar.getEvents(pastLimit, futureLimit);
  const visitas = [];

  events.forEach(event => {
    const title = event.getTitle();
    if (title.startsWith('Visita:')) {
      const start = event.getStartTime();
      const fecha = Utilities.formatDate(start, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      const horaInicio = Utilities.formatDate(start, Session.getScriptTimeZone(), 'HH:mm');

      // Extraer nombre e institución del título: "Visita: Institución - Nombre"
      const parts = title.replace('Visita: ', '').split(' - ');
      const institucion = parts[0] || '';
      const nombre = parts[1] || '';

      visitas.push({
        fecha: fecha,
        horaInicio: horaInicio,
        nombre: nombre,
        institucion: institucion,
      });
    }
  });

  return ContentService.createTextOutput(JSON.stringify({ visitas: visitas }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===================================================
// doPost — Crea visita o procesa formulario existente
// ===================================================
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.tipo === 'visita') {
      return crearVisita(data);
    }

    // Lógica existente para formularios de contacto
    return procesarFormulario(data);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function crearVisita(data) {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);

  // Crear fecha/hora del evento
  const [year, month, day] = data.fecha.split('-').map(Number);
  const [startHour, startMin] = data.horaInicio.split(':').map(Number);
  const [endHour, endMin] = data.horaFin.split(':').map(Number);

  const startTime = new Date(year, month - 1, day, startHour, startMin);
  const endTime = new Date(year, month - 1, day, endHour, endMin);

  // Crear evento en Google Calendar
  const title = `Visita: ${data.institucion} - ${data.nombre}`;
  const event = calendar.createEvent(title, startTime, endTime, {
    description: `Cliente: ${data.nombre}\nInstitución: ${data.institucion}\nFranja: ${data.franja}\n\nReservado desde volckan.com`,
    location: 'Por confirmar',
  });

  // Guardar en hoja "Visitas"
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Visitas');
  if (!sheet) {
    sheet = ss.insertSheet('Visitas');
    sheet.appendRow(['Fecha', 'Hora Inicio', 'Hora Fin', 'Nombre', 'Institución', 'Timestamp']);
  }
  sheet.appendRow([data.fecha, data.horaInicio, data.horaFin, data.nombre, data.institucion, new Date()]);

  // Notificar por Telegram
  const msg = `📅 *Nueva Visita Agendada*\n\n👤 ${data.nombre}\n🏛 ${data.institucion}\n📆 ${data.fecha}\n🕐 ${data.franja}\n\n_Evento creado en Google Calendar_`;
  enviarTelegram(msg);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===================================================
// FORMULARIO EXISTENTE (tu lógica actual)
// ===================================================
function procesarFormulario(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Respuestas') || ss.getSheets()[0];

  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.institucion || '',
    data.contacto || '',
    data.fechaDeseada || '',
    data.horario || '',
  ]);

  const msg = `📩 *Nuevo contacto desde volckan.com*\n\n👤 ${data.nombre}\n🏛 ${data.institucion}\n📱 ${data.contacto}\n📆 ${data.fechaDeseada || 'N/A'}\n🕐 ${data.horario || 'N/A'}`;
  enviarTelegram(msg);

  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===================================================
// TELEGRAM
// ===================================================
function enviarTelegram(mensaje) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: mensaje,
    parse_mode: 'Markdown',
  };
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  });
}
