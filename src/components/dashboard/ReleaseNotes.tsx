import { useState } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import { useLanguage } from '../../i18n/LanguageContext';

// Product preview images (reuse from dashboard)
import cardSocialgest from '../../assets/images/dashboard/card-socialgest.png';
import cardTikket from '../../assets/images/dashboard/card-tikket.png';
import cardAdvocates from '../../assets/images/dashboard/card-advocates.png';
import cardQuantico from '../../assets/images/dashboard/card-quantico.png';

// Product imagotipos
import socialgestImagotipo from '../../assets/images/SocialGest-Imagotipo-Blue.png';
import tikketImagotipo from '../../assets/images/Tikket-Imagotipo-Blue.png';
import advocatesImagotipo from '../../assets/images/Advocates-Imagotipo-Blue.png';
import quanticoImagotipo from '../../assets/images/Quantico-Imagotipo-Blue.png';

const productImages: Record<string, string> = {
  SocialGest: cardSocialgest,
  Tikket: cardTikket,
  Advocates: cardAdvocates,
  Quantico: cardQuantico,
};

const productImagotipos: Record<string, string> = {
  SocialGest: socialgestImagotipo,
  Tikket: tikketImagotipo,
  Advocates: advocatesImagotipo,
  Quantico: quanticoImagotipo,
};

interface ReleaseEntry {
  version: string;
  title: Record<string, string>;
  date: string; // ISO date
  description: Record<string, string>;
  features: Record<string, string[]>;
  image?: string;
}

interface ProductReleases {
  productName: string;
  releases: ReleaseEntry[];
}

// All product tabs in fixed order
const ALL_PRODUCTS = [
  { name: 'SocialGest', label: 'SocialGest' },
  { name: 'Tikket', label: 'Tikket' },
  { name: 'Advocates', label: 'AdvocatesPro' },
  { name: 'Quantico', label: 'Quantico' },
];

// Mock release notes data (to be replaced with API later)
const mockReleaseNotes: ProductReleases[] = [
  {
    productName: 'SocialGest',
    releases: [
      {
        version: 'v2.4',
        title: {
          es: 'Mejora en la programación de publicaciones',
          en: 'Improved post scheduling',
          pt: 'Melhoria no agendamento de publicações',
        },
        date: '2025-10-02',
        description: {
          es: 'Hemos mejorado la experiencia de programación de publicaciones en SocialGest. Ahora puedes programar contenido de forma más eficiente con nuevas herramientas de calendario y sugerencias de horarios óptimos para maximizar el alcance de tus publicaciones.',
          en: 'We have improved the post scheduling experience in SocialGest. You can now schedule content more efficiently with new calendar tools and optimal time suggestions to maximize the reach of your posts.',
          pt: 'Melhoramos a experiência de agendamento de publicações no SocialGest. Agora você pode agendar conteúdo de forma mais eficiente com novas ferramentas de calendário e sugestões de horários ideais para maximizar o alcance das suas publicações.',
        },
        features: {
          es: [
            'Nuevo calendario visual con vista semanal y mensual',
            'Sugerencias de horarios óptimos basadas en tu audiencia',
            'Programación en lote para múltiples redes sociales',
            'Vista previa mejorada del contenido antes de publicar',
            'Integración con la librería de medios actualizada',
          ],
          en: [
            'New visual calendar with weekly and monthly views',
            'Optimal time suggestions based on your audience',
            'Batch scheduling for multiple social networks',
            'Improved content preview before publishing',
            'Integration with the updated media library',
          ],
          pt: [
            'Novo calendário visual com vista semanal e mensal',
            'Sugestões de horários ideais baseadas na sua audiência',
            'Agendamento em lote para múltiplas redes sociais',
            'Pré-visualização melhorada do conteúdo antes de publicar',
            'Integração com a biblioteca de mídia atualizada',
          ],
        },
      },
    ],
  },
  {
    productName: 'Tikket',
    releases: [
      {
        version: 'v3.1',
        title: {
          es: 'Nuevo sistema de asignación automática',
          en: 'New automatic assignment system',
          pt: 'Novo sistema de atribuição automática',
        },
        date: '2025-09-18',
        description: {
          es: 'Tikket ahora cuenta con un sistema inteligente de asignación automática de tickets. Los tickets se distribuyen automáticamente entre los agentes disponibles según su carga de trabajo, especialidad y prioridad del caso.',
          en: 'Tikket now features an intelligent automatic ticket assignment system. Tickets are automatically distributed among available agents based on their workload, specialty, and case priority.',
          pt: 'O Tikket agora conta com um sistema inteligente de atribuição automática de tickets. Os tickets são distribuídos automaticamente entre os agentes disponíveis de acordo com sua carga de trabalho, especialidade e prioridade do caso.',
        },
        features: {
          es: [
            'Asignación inteligente basada en carga de trabajo',
            'Reglas personalizables por equipo y categoría',
            'Redistribución automática cuando un agente no está disponible',
            'Dashboard de métricas de distribución en tiempo real',
            'Soporte para escalamiento automático por SLA',
          ],
          en: [
            'Intelligent assignment based on workload',
            'Customizable rules by team and category',
            'Automatic redistribution when an agent is unavailable',
            'Real-time distribution metrics dashboard',
            'Support for automatic SLA escalation',
          ],
          pt: [
            'Atribuição inteligente baseada em carga de trabalho',
            'Regras personalizáveis por equipe e categoria',
            'Redistribuição automática quando um agente não está disponível',
            'Dashboard de métricas de distribuição em tempo real',
            'Suporte para escalamento automático por SLA',
          ],
        },
      },
    ],
  },
  {
    productName: 'Advocates',
    releases: [
      {
        version: 'v1.8',
        title: {
          es: 'Gamificación y rankings de embajadores',
          en: 'Ambassador gamification and rankings',
          pt: 'Gamificação e rankings de embaixadores',
        },
        date: '2025-08-25',
        description: {
          es: 'AdvocatesPro incorpora un nuevo sistema de gamificación que motiva a los embajadores con puntos, badges y rankings. Incentiva la participación activa y premia a los colaboradores más comprometidos.',
          en: 'AdvocatesPro incorporates a new gamification system that motivates ambassadors with points, badges, and rankings. It incentivizes active participation and rewards the most engaged collaborators.',
          pt: 'O AdvocatesPro incorpora um novo sistema de gamificação que motiva os embaixadores com pontos, badges e rankings. Incentiva a participação ativa e premia os colaboradores mais engajados.',
        },
        features: {
          es: [
            'Sistema de puntos por publicaciones y engagement',
            'Badges desbloqueables por logros alcanzados',
            'Ranking mensual de embajadores más activos',
            'Bonificaciones configurables por el administrador',
            'Panel de progreso individual para cada embajador',
          ],
          en: [
            'Points system for posts and engagement',
            'Unlockable badges for achievements',
            'Monthly ranking of most active ambassadors',
            'Configurable bonuses by the administrator',
            'Individual progress panel for each ambassador',
          ],
          pt: [
            'Sistema de pontos por publicações e engajamento',
            'Badges desbloqueáveis por conquistas alcançadas',
            'Ranking mensal dos embaixadores mais ativos',
            'Bonificações configuráveis pelo administrador',
            'Painel de progresso individual para cada embaixador',
          ],
        },
      },
    ],
  },
  {
    productName: 'Quantico',
    releases: [
      {
        version: 'v2.0',
        title: {
          es: 'Dashboards personalizables con drag & drop',
          en: 'Customizable dashboards with drag & drop',
          pt: 'Dashboards personalizáveis com drag & drop',
        },
        date: '2025-09-05',
        description: {
          es: 'Quantico introduce dashboards completamente personalizables donde puedes arrastrar y soltar widgets de métricas, gráficos y tablas para crear la vista perfecta según tus necesidades de análisis.',
          en: 'Quantico introduces fully customizable dashboards where you can drag and drop metric widgets, charts, and tables to create the perfect view for your analysis needs.',
          pt: 'O Quantico apresenta dashboards completamente personalizáveis onde você pode arrastar e soltar widgets de métricas, gráficos e tabelas para criar a visualização perfeita de acordo com suas necessidades de análise.',
        },
        features: {
          es: [
            'Editor visual drag & drop para widgets',
            'Más de 20 tipos de gráficos disponibles',
            'Filtros globales por fecha, producto y región',
            'Exportación automática de reportes en PDF',
            'Plantillas prediseñadas para diferentes industrias',
          ],
          en: [
            'Visual drag & drop editor for widgets',
            'Over 20 chart types available',
            'Global filters by date, product, and region',
            'Automatic PDF report export',
            'Pre-designed templates for different industries',
          ],
          pt: [
            'Editor visual drag & drop para widgets',
            'Mais de 20 tipos de gráficos disponíveis',
            'Filtros globais por data, produto e região',
            'Exportação automática de relatórios em PDF',
            'Templates pré-desenhados para diferentes indústrias',
          ],
        },
      },
    ],
  },
];

function formatDate(isoDate: string, lang: string): string {
  const date = new Date(isoDate + 'T12:00:00');
  const localeMap: Record<string, string> = { es: 'es-ES', en: 'en-US', pt: 'pt-BR' };
  return date.toLocaleDateString(localeMap[lang] || 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function ReleaseNotes() {
  const t = useTranslation();
  const { language } = useLanguage();

  const [activeProduct, setActiveProduct] = useState<string>(ALL_PRODUCTS[0].name);

  // Get release notes for the active product
  const activeReleases = mockReleaseNotes.find(
    (rn) => rn.productName === activeProduct
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        {/* Megaphone icon */}
        <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0061FE" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
            <path d="M2 8c0-3.314 2.686-6 6-6" />
            <path d="M22 8c0-3.314-2.686-6-6-6" />
          </svg>
        </div>
        <div>
          <h2 className="text-[24px] font-bold text-grey-900 leading-tight">
            {t.releaseNotes.title}
          </h2>
          <p className="text-[15px] text-grey-300 mt-1">
            {t.releaseNotes.subtitle}
          </p>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="border-b border-[#ECECEC] mb-8">
        <div className="flex gap-8">
          {ALL_PRODUCTS.map((prod) => (
            <button
              key={prod.name}
              onClick={() => setActiveProduct(prod.name)}
              className={[
                'pb-3 text-[15px] font-semibold transition-colors relative',
                activeProduct === prod.name
                  ? 'text-grey-900'
                  : 'text-grey-300 hover:text-grey-400',
              ].join(' ')}
            >
              {prod.label}
              {activeProduct === prod.name && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Release Entries */}
      {activeReleases ? (
        activeReleases.releases.map((release, idx) => (
          <div key={idx} className="mb-10">
            {/* Product name + date */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={productImagotipos[activeProduct]}
                alt={activeProduct}
                className="h-[22px]"
              />
              <span className="text-[13px] text-grey-300">
                {formatDate(release.date, language)}
              </span>
            </div>

            {/* Version + Title */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="text-[18px]">&#x1F680;</span>
              <h3 className="text-[18px] font-bold text-grey-900">
                {release.version} {release.title[language] || release.title.es}
              </h3>
            </div>

            {/* Description */}
            <p className="text-[15px] text-grey-400 leading-[170%] mb-5">
              {release.description[language] || release.description.es}
            </p>

            {/* Feature List */}
            <ul className="space-y-2.5 mb-8">
              {(release.features[language] || release.features.es).map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 text-[15px] text-grey-400 leading-[150%]">
                  <span className="w-1.5 h-1.5 rounded-full bg-grey-300 mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Screenshot / Image */}
            {productImages[activeProduct] && (
              <div className="bg-[#F5F7FA] rounded-2xl p-6 flex items-center justify-center">
                <img
                  src={productImages[activeProduct]}
                  alt={`${activeProduct} screenshot`}
                  className="rounded-xl max-w-full shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  style={{ maxHeight: 400 }}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-grey-300 text-[15px]">{t.releaseNotes.noUpdates}</p>
        </div>
      )}
    </div>
  );
}
