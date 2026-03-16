import React from 'react';
import {
  pdf,
  Document,
  Page,
  View,
  Text,
  Image,
} from '@react-pdf/renderer';
import type { ProposalDetail, ProposalAIAnalysisResult } from '../types';

// ── Constants ────────────────────────────────────────────────────────────────
const BLUE      = '#0058E7';
const PURPLE    = '#6366F1';
const DARK_BG   = '#0A1628';
const DARK_BOX  = '#0D2D6E';
const DARK_LINE = '#1E3A5F';
const TXT_DARK  = '#1E293B';
const TXT_MID   = '#64748B';
const TXT_LIGHT = '#94A3B8';
const WHITE     = '#FFFFFF';
const LIGHT_BG  = '#F8FAFC';
const BORDER    = '#E2E8F0';
const SUM_BG    = '#EBF0FD';
const SUM_TXT   = '#3730A3';

const PLATFORM_META: Record<string, { color: string; label: string }> = {
  linkedin:  { color: '#0A66C2', label: 'LinkedIn' },
  instagram: { color: '#C13584', label: 'Instagram' },
  facebook:  { color: '#1877F2', label: 'Facebook' },
  tiktok:    { color: '#010101', label: 'TikTok' },
  twitter:   { color: '#14171A', label: 'Twitter / X' },
};

const ORGANIC_REACH: Record<string, number> = {
  linkedin: 0.10, instagram: 0.08, facebook: 0.03, twitter: 0.08, tiktok: 0.25,
};

const CLASS_COLOR: Record<string, string> = {
  HIGH: '#16A34A', MEDIUM: '#D97706', LOW: '#94A3B8',
};
const CLASS_LABEL: Record<string, string> = {
  HIGH: 'ALTA OPORTUNIDAD', MEDIUM: 'OPORTUNIDAD MEDIA', LOW: 'BAJA',
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function calcImpressions(proj: ProposalDetail['projections'][0]): number {
  const reach = proj.potentialReach ?? (proj.followers + (proj.ambassadorFollowers ?? 0));
  return Math.round(reach * (ORGANIC_REACH[proj.platform.toLowerCase()] ?? 0.08));
}

async function toBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror   = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch { return null; }
}

// ── Shared components ─────────────────────────────────────────────────────────

/** Two-tone blue/purple accent bar at top of each page */
function AccentBar() {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 7, flexDirection: 'row' }}>
      <View style={{ flex: 1, backgroundColor: BLUE }} />
      <View style={{ flex: 1, backgroundColor: PURPLE }} />
    </View>
  );
}

/** Footer bar with page numbers */
function PageFooter({ dark = false }: { dark?: boolean }) {
  const color = dark ? '#2D4A7A' : TXT_LIGHT;
  return (
    <View style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      paddingHorizontal: 48, paddingVertical: 14,
      borderTopWidth: 1, borderTopColor: dark ? DARK_LINE : BORDER,
    }}>
      <Text style={{ fontSize: 8, color }}>Powered by AdvocatesPro · Magnetic Suite</Text>
      <Text
        style={{ fontSize: 8, color }}
        render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
          `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}

function SLabel({ children }: { children: string }) {
  return (
    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 8, color: TXT_MID, letterSpacing: 1.5, marginBottom: 8 }}>
      {children.toUpperCase()}
    </Text>
  );
}

/** Card with a colored left strip */
function StripCard({
  color, children, style = {},
}: { color: string; children: React.ReactNode; style?: object }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: WHITE, borderRadius: 8, marginBottom: 10, ...style }}>
      <View style={{ width: 4, backgroundColor: color, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
      <View style={{ flex: 1, padding: 14 }}>{children}</View>
    </View>
  );
}

// ── PAGE 1: Cover ─────────────────────────────────────────────────────────────
function CoverPage({
  company, date, logoB64,
}: { company: ProposalDetail['company']; date: string; logoB64: string | null }) {
  return (
    <Page size="A4" style={{ backgroundColor: DARK_BG, fontFamily: 'Helvetica', paddingBottom: 56 }}>
      <AccentBar />
      <View style={{ paddingHorizontal: 52, paddingTop: 44, flex: 1 }}>

        {/* Header row: label + logo */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 68 }}>
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: '#5B8FF9', letterSpacing: 2.5 }}>
            PROPUESTA COMERCIAL · ADVOCATESPRO
          </Text>
          {logoB64 && (
            <Image src={logoB64} style={{ width: 54, height: 54, objectFit: 'contain' }} />
          )}
        </View>

        {/* Company name */}
        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 46, color: WHITE, lineHeight: 1.1, marginBottom: 14 }}>
          {company?.name ?? 'Empresa'}
        </Text>

        {company?.industry && (
          <Text style={{ fontSize: 16, color: TXT_LIGHT, marginBottom: 42 }}>
            {company.industry}
          </Text>
        )}

        <View style={{ width: 60, height: 3, backgroundColor: BLUE, borderRadius: 2, marginBottom: 20 }} />

        <Text style={{ fontSize: 12, color: TXT_LIGHT, marginBottom: 8 }}>{date}</Text>

        {company?.website && (
          <Text style={{ fontSize: 10, color: '#3B82F6' }}>
            {company.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </Text>
        )}

        <View style={{ flex: 1 }} />
      </View>
      <PageFooter dark />
    </Page>
  );
}

// ── PAGE 2: Company + Social Presence ─────────────────────────────────────────
function CompanyPage({
  company, projections,
}: { company: ProposalDetail['company']; projections: ProposalDetail['projections'] }) {
  const maxFollowers = Math.max(...projections.map(p => p.followers), 1);
  const BAR_W = 210;

  return (
    <Page size="A4" style={{ backgroundColor: WHITE, fontFamily: 'Helvetica', paddingBottom: 56 }}>
      <AccentBar />
      <View style={{ paddingHorizontal: 48, paddingTop: 32 }}>

        <SLabel>La empresa</SLabel>

        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 24, color: TXT_DARK, marginBottom: 4 }}>
          {company?.name ?? ''}
        </Text>

        {company?.industry && (
          <Text style={{ fontSize: 12, color: TXT_MID, marginBottom: 12 }}>
            {company.industry}
          </Text>
        )}

        {company?.description && (
          <Text style={{ fontSize: 10, color: TXT_LIGHT, lineHeight: 1.65, marginBottom: 22 }}>
            {company.description.length > 380
              ? company.description.substring(0, 380) + '…'
              : company.description}
          </Text>
        )}

        {/* Stat chips */}
        <View style={{ flexDirection: 'row', marginBottom: 28 }}>
          {(company?.employeeCount ?? 0) > 0 && (
            <View style={{ flex: 1, backgroundColor: LIGHT_BG, borderRadius: 10, padding: 14, marginRight: 10 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 20, color: TXT_DARK }}>
                {fmt(company!.employeeCount!)}
              </Text>
              <Text style={{ fontSize: 9, color: TXT_MID, marginTop: 3 }}>Empleados en LinkedIn</Text>
            </View>
          )}
          {(company?.followers ?? 0) > 0 && (
            <View style={{ flex: 1, backgroundColor: LIGHT_BG, borderRadius: 10, padding: 14, marginRight: 10 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 20, color: TXT_DARK }}>
                {fmt(company!.followers!)}
              </Text>
              <Text style={{ fontSize: 9, color: TXT_MID, marginTop: 3 }}>Seguidores en LinkedIn</Text>
            </View>
          )}
          {projections.length > 0 && (
            <View style={{ flex: 1, backgroundColor: LIGHT_BG, borderRadius: 10, padding: 14 }}>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 20, color: TXT_DARK }}>
                {projections.length}
              </Text>
              <Text style={{ fontSize: 9, color: TXT_MID, marginTop: 3 }}>Plataformas analizadas</Text>
            </View>
          )}
        </View>

        <View style={{ height: 1, backgroundColor: BORDER, marginBottom: 24 }} />
        <SLabel>Presencia en redes sociales</SLabel>

        {projections.map((proj, i) => {
          const meta = PLATFORM_META[proj.platform.toLowerCase()] ?? { color: '#374151', label: proj.platform };
          const fillW = (proj.followers / maxFollowers) * BAR_W;
          return (
            <View key={i} style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 11,
              borderBottomWidth: i < projections.length - 1 ? 1 : 0,
              borderBottomColor: BORDER,
            }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: meta.color, marginRight: 10 }} />
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 11, color: meta.color, width: 88 }}>
                {meta.label}
              </Text>
              {/* Track */}
              <View style={{ width: BAR_W, height: 10, backgroundColor: BORDER, borderRadius: 5, marginRight: 10 }}>
                <View style={{ width: fillW, height: 10, backgroundColor: meta.color, borderRadius: 5 }} />
              </View>
              <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 11, color: TXT_DARK, width: 50 }}>
                {fmt(proj.followers)}
              </Text>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: '#EBF0FD', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 2 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 11, color: BLUE }}>
                    ×{proj.growthFactor.toFixed(1)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// ── PAGE 3: Projections with bars ─────────────────────────────────────────────
function ProjectionsPage({ projections }: { projections: ProposalDetail['projections'] }) {
  const impressions = projections.map(p => calcImpressions(p));
  const maxVal = Math.max(...projections.map((p, i) => Math.max(p.followers, impressions[i])), 1);

  return (
    <Page size="A4" style={{ backgroundColor: LIGHT_BG, fontFamily: 'Helvetica', paddingBottom: 56 }}>
      <AccentBar />
      <View style={{ paddingHorizontal: 48, paddingTop: 32 }}>

        <SLabel>Tu potencial con Adpro</SLabel>

        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 22, color: TXT_DARK, marginBottom: 4 }}>
          Crecimiento proyectado por plataforma
        </Text>
        <Text style={{ fontSize: 10, color: TXT_MID, marginBottom: 20 }}>
          Métricas actuales vs. impresiones estimadas activando Employee Advocacy
        </Text>

        {/* Legend */}
        <View style={{ flexDirection: 'row', marginBottom: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
            <View style={{ width: 18, height: 8, backgroundColor: BLUE, borderRadius: 2, marginRight: 6 }} />
            <Text style={{ fontSize: 9, color: TXT_MID }}>Seguidores actuales</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 18, height: 8, backgroundColor: '#A78BFA', borderRadius: 2, marginRight: 6 }} />
            <Text style={{ fontSize: 9, color: TXT_MID }}>Impresiones estimadas con Adpro</Text>
          </View>
        </View>

        {projections.map((proj, i) => {
          const meta = PLATFORM_META[proj.platform.toLowerCase()] ?? { color: '#374151', label: proj.platform };
          const imp  = impressions[i];
          const follPct = `${Math.round((proj.followers / maxVal) * 100)}%`;
          const impPct  = `${Math.round((imp / maxVal) * 100)}%`;
          const cc = CLASS_COLOR[proj.classification] ?? TXT_MID;

          return (
            <StripCard key={i} color={meta.color}>
              {/* Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 14, color: meta.color }}>
                  {meta.label}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ backgroundColor: '#EBF0FD', borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6 }}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 14, color: BLUE }}>
                      ×{proj.growthFactor.toFixed(1)}
                    </Text>
                  </View>
                  <View style={{ backgroundColor: LIGHT_BG, borderRadius: 5, paddingHorizontal: 8, paddingVertical: 3 }}>
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 8, color: cc }}>
                      {CLASS_LABEL[proj.classification] ?? proj.classification}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Bar: followers */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 8.5, color: TXT_LIGHT, width: 118 }}>Seguidores actuales</Text>
                <View style={{ flex: 1, height: 11, backgroundColor: '#EEF2FF', borderRadius: 6, marginRight: 8 }}>
                  <View style={{ width: follPct, height: 11, backgroundColor: BLUE, borderRadius: 6 }} />
                </View>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: TXT_DARK, width: 48, textAlign: 'right' }}>
                  {fmt(proj.followers)}
                </Text>
              </View>

              {/* Bar: impressions */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 8.5, color: TXT_LIGHT, width: 118 }}>Impresiones con Adpro</Text>
                <View style={{ flex: 1, height: 11, backgroundColor: '#EDE9FE', borderRadius: 6, marginRight: 8 }}>
                  <View style={{ width: impPct, height: 11, backgroundColor: '#A78BFA', borderRadius: 6 }} />
                </View>
                <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: TXT_DARK, width: 48, textAlign: 'right' }}>
                  {fmt(imp)}
                </Text>
              </View>

              <Text style={{ fontSize: 8, color: TXT_LIGHT }}>
                {proj.ambassadorCount} embajadores potenciales · {fmt(proj.ambassadorFollowers ?? 0)} seguidores combinados
              </Text>
            </StripCard>
          );
        })}
      </View>
      <PageFooter />
    </Page>
  );
}

// ── PAGE 4: AI Analysis + Benefits ───────────────────────────────────────────
function AnalysisPage({ analysis }: { analysis: ProposalAIAnalysisResult }) {
  return (
    <Page size="A4" style={{ backgroundColor: WHITE, fontFamily: 'Helvetica', paddingBottom: 56 }}>
      <AccentBar />
      <View style={{ paddingHorizontal: 48, paddingTop: 32 }}>

        <SLabel>Análisis IA · Powered by GPT</SLabel>

        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 22, color: TXT_DARK, marginBottom: 16 }}>
          Diagnóstico y oportunidades
        </Text>

        {/* Summary */}
        <StripCard color={BLUE} style={{ marginBottom: 22 }}>
          <Text style={{ fontSize: 11, color: SUM_TXT, lineHeight: 1.7, backgroundColor: SUM_BG }}>
            {analysis.summary}
          </Text>
        </StripCard>

        {/* Two columns */}
        <View style={{ flexDirection: 'row' }}>

          {/* Left: Platform insights */}
          <View style={{ flex: 1, marginRight: 10 }}>
            <SLabel>Oportunidades por plataforma</SLabel>
            {analysis.platformInsights.slice(0, 3).map((pi, i) => {
              const meta = PLATFORM_META[pi.platform.toLowerCase()] ?? { color: BLUE, label: pi.platform };
              return (
                <View key={i} style={{ backgroundColor: LIGHT_BG, borderRadius: 8, padding: 11, marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: meta.color, marginRight: 6 }} />
                    <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: meta.color }}>
                      {meta.label}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 9, color: TXT_MID, lineHeight: 1.5, marginBottom: 5 }}>
                    {pi.insight.length > 120 ? pi.insight.substring(0, 120) + '…' : pi.insight}
                  </Text>
                  <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 9, color: '#16A34A', lineHeight: 1.4 }}>
                    {'→ '}{pi.opportunity.length > 110 ? pi.opportunity.substring(0, 110) + '…' : pi.opportunity}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Right: Key benefits */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <SLabel>Beneficios clave</SLabel>
            {analysis.keyBenefits.slice(0, 3).map((benefit, i) => (
              <View key={i} style={{ backgroundColor: LIGHT_BG, borderRadius: 8, padding: 11, marginBottom: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{
                    width: 18, height: 18, borderRadius: 9,
                    backgroundColor: BLUE,
                    alignItems: 'center', justifyContent: 'center',
                    marginRight: 8, flexShrink: 0, marginTop: 1,
                  }}>
                    <Text style={{ fontSize: 10, color: WHITE, fontFamily: 'Helvetica-Bold' }}>+</Text>
                  </View>
                  <Text style={{ fontSize: 10, color: TXT_DARK, lineHeight: 1.55, flex: 1 }}>
                    {benefit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PageFooter />
    </Page>
  );
}

// ── PAGE 5: CTA ───────────────────────────────────────────────────────────────
function CtaPage({
  analysis, companyName,
}: { analysis: ProposalAIAnalysisResult; companyName: string }) {
  return (
    <Page size="A4" style={{ backgroundColor: DARK_BG, fontFamily: 'Helvetica', paddingBottom: 56 }}>
      <AccentBar />
      <View style={{ paddingHorizontal: 52, flex: 1, justifyContent: 'center' }}>

        <View style={{
          backgroundColor: DARK_BOX,
          borderRadius: 16,
          padding: 44,
          borderWidth: 1,
          borderColor: '#1E4DA8',
        }}>
          <Text style={{ fontSize: 10.5, color: '#93C5FD', textAlign: 'center', letterSpacing: 1.5, marginBottom: 18 }}>
            ¿LISTOS PARA CRECER JUNTOS?
          </Text>

          {analysis.callToAction && (
            <Text style={{
              fontFamily: 'Helvetica-Bold',
              fontSize: 18,
              color: WHITE,
              textAlign: 'center',
              lineHeight: 1.65,
              marginBottom: 36,
            }}>
              "{analysis.callToAction}"
            </Text>
          )}

          <View style={{
            backgroundColor: BLUE,
            borderRadius: 28,
            paddingVertical: 13,
            paddingHorizontal: 36,
            alignSelf: 'center',
          }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 13, color: WHITE }}>
              Agendar Demo de Adpro  →
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 10, color: '#2D4A7A', textAlign: 'center', marginTop: 24 }}>
          {companyName}
        </Text>
      </View>
      <PageFooter dark />
    </Page>
  );
}

// ── Document ──────────────────────────────────────────────────────────────────
function ProposalDocument({
  proposal, analysis, logoB64,
}: { proposal: ProposalDetail; analysis: ProposalAIAnalysisResult; logoB64: string | null }) {
  const company     = proposal.company;
  const projections = proposal.projections ?? [];
  const date = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Document
      title={`Propuesta Adpro · ${company?.name ?? 'Empresa'}`}
      author="Magnetic Suite"
      subject="Propuesta Comercial AdvocatesPro"
    >
      <CoverPage company={company} date={date} logoB64={logoB64} />
      <CompanyPage company={company} projections={projections} />
      {projections.length > 0 && <ProjectionsPage projections={projections} />}
      <AnalysisPage analysis={analysis} />
      <CtaPage analysis={analysis} companyName={company?.name ?? ''} />
    </Document>
  );
}

// ── Export ────────────────────────────────────────────────────────────────────
export async function generateProposalPdf(
  proposal: ProposalDetail,
  analysis: ProposalAIAnalysisResult,
  apiBase: string,
): Promise<void> {
  let logoB64: string | null = null;
  if (proposal.company?.logo) {
    const proxyUrl = `${apiBase}/proposals/image-proxy?url=${encodeURIComponent(proposal.company.logo)}`;
    logoB64 = await toBase64(proxyUrl);
  }

  const blob = await pdf(
    React.createElement(ProposalDocument, { proposal, analysis, logoB64 }),
  ).toBlob();

  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  const slug = (proposal.company?.name ?? 'empresa').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
  a.download = `Propuesta_Adpro_${slug}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
