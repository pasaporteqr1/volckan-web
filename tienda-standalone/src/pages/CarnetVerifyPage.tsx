import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useStoreConfig } from '../context/StoreConfigContext';
import { formatDpiString, formatPhoneString } from '../components/carnet/CarnetCardPreview';
import StoreTopBar from '../components/StoreTopBar';
import type { CarnetSubmission } from '../types/carnet';
import './CarnetVerifyPage.css';

export default function CarnetVerifyPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { carnetSubmissions, carnetConfig } = useStoreConfig();

  const rawId = searchParams.get('id') || '';
  const cleanId = rawId.replace(/\D/g, '');

  const [loading, setLoading] = useState<boolean>(true);
  const [submission, setSubmission] = useState<CarnetSubmission | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function findSubmission() {
      if (!rawId) {
        if (isMounted) setLoading(false);
        return;
      }

      // 1. Buscar primero en la memoria local activa
      const localMatch = carnetSubmissions.find(s => 
        s.id === rawId || 
        s.idNumber === cleanId || 
        s.idNumber === rawId
      );

      if (localMatch) {
        if (isMounted) {
          setSubmission(localMatch);
          setLoading(false);
        }
        return;
      }

      // 2. Si no está en memoria, consultar Firestore directamente
      if (db) {
        try {
          // Búsqueda por ID de documento
          const docRef = doc(db, 'carnet_submissions', rawId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists() && isMounted) {
            setSubmission({ ...(docSnap.data() as CarnetSubmission), id: docSnap.id });
            setLoading(false);
            return;
          }

          // Búsqueda por número de DPI
          if (cleanId) {
            const qDpi = query(collection(db, 'carnet_submissions'), where('idNumber', '==', cleanId));
            const snapDpi = await getDocs(qDpi);
            if (!snapDpi.empty && isMounted) {
              const firstDoc = snapDpi.docs[0];
              setSubmission({ ...(firstDoc.data() as CarnetSubmission), id: firstDoc.id });
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn('[CarnetVerifyPage] Error consultando credencial en Firestore:', err);
        }
      }

      if (isMounted) setLoading(false);
    }

    findSubmission();

    return () => {
      isMounted = false;
    };
  }, [rawId, cleanId, carnetSubmissions]);

  return (
    <div className="verify-page-root animate-fade-in">
      <StoreTopBar slogan="Sistema de Validación Criptográfica de Accesos & Credenciales" />

      <main className="verify-container">
        {loading ? (
          <div className="verify-card verify-loading-state">
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '16px' }}>⏳</span>
            <h3>Verificando Credencial Oficial...</h3>
            <p style={{ color: '#94a3b8' }}>Consultando registro en el libro maestro de acreditaciones.</p>
          </div>
        ) : submission ? (
          <div className="verify-card">
            {/* Cabecera de Verificación Oficial */}
            <div className="verify-header-band">
              <div className={`verify-status-chip ${submission.status === 'pendiente' ? 'warning' : ''}`}>
                <span>{submission.status === 'pendiente' ? '⏳' : '✓'}</span>
                <span>
                  {submission.status === 'pendiente' 
                    ? 'Registro en Proceso de Impresión' 
                    : 'Credencial Acreditada & Válida'}
                </span>
              </div>
              <h1 className="verify-header-title">
                {submission.institutionName || carnetConfig.institutionName || 'Mesa de Competitividad de Quetzaltenango'}
              </h1>
              <p className="verify-header-sub">
                Pase Oficial de Acreditación, Identificación y Acceso a Conferencia
              </p>
            </div>

            {/* Cuerpo con Datos del Titular */}
            <div className="verify-body">
              <div className="verify-photo-cluster">
                <div className="verify-photo-wrap">
                  {submission.photoUrl ? (
                    <img src={submission.photoUrl} alt={submission.fullName} className="verify-photo-img" />
                  ) : (
                    <span className="verify-photo-empty">👤</span>
                  )}
                </div>
                <div className="verify-subject-title">
                  <h2 className="verify-subject-name">{submission.fullName}</h2>
                  {submission.institutionRepresented && (
                    <span className="verify-subject-institution">
                      🏢 {submission.institutionRepresented}
                    </span>
                  )}
                </div>
              </div>

              {/* Parrilla de Datos Validados */}
              <div className="verify-data-grid">
                <div className="verify-data-item">
                  <span className="verify-data-label">DPI / CUI Oficial</span>
                  <span className="verify-data-val mono">{formatDpiString(submission.idNumber)}</span>
                </div>

                <div className="verify-data-item">
                  <span className="verify-data-label">Teléfono Móvil</span>
                  <span className="verify-data-val">{formatPhoneString(submission.phone)}</span>
                </div>

                {submission.departmentMunicipality && (
                  <div className="verify-data-item">
                    <span className="verify-data-label">Procedencia</span>
                    <span className="verify-data-val">📍 {submission.departmentMunicipality}</span>
                  </div>
                )}

                <div className="verify-data-item">
                  <span className="verify-data-label">Fecha de Emisión</span>
                  <span className="verify-data-val">
                    {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Sello de Seguridad */}
              <div className="verify-security-stamp">
                <span className="stamp-icon">🛡️</span>
                <div className="stamp-text">
                  <strong>Registro Oficial Verificado:</strong> Esta credencial fue emitida electrónicamente por el sistema 
                  Volckan ID con token de seguridad intransferible para control de accesos a paneles y eventos.
                </div>
              </div>

              {/* Acciones */}
              <div className="verify-actions">
                <button 
                  type="button" 
                  className="btn-verify-action primary"
                  onClick={() => navigate('/registro')}
                >
                  <span>🪪</span> Solicitar o Renovar Credencial Oficial
                </button>
                <button 
                  type="button" 
                  className="btn-verify-action secondary"
                  onClick={() => navigate('/')}
                >
                  <span>🛍️</span> Volver a la Tienda Volckan
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="verify-card verify-empty-state">
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3>No se encontró el registro de acreditación</h3>
            <p>
              El código consultado ({cleanId || rawId || 'sin especificar'}) no coincide con ningún carnet registrado 
              o aún está pendiente de sincronización.
            </p>
            <div className="verify-actions" style={{ maxWidth: '320px', margin: '0 auto' }}>
              <button 
                type="button" 
                className="btn-verify-action primary"
                onClick={() => navigate('/registro')}
              >
                <span>📝</span> Ir al Formulario de Registro
              </button>
              <button 
                type="button" 
                className="btn-verify-action secondary"
                onClick={() => navigate('/')}
              >
                <span>🏠</span> Ir al Portal Principal
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
