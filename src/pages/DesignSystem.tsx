import { useState } from 'react';
import {
  // Tokens
  colors,

  // Button
  Button,
  IconButton,
  Toggle,

  // Input
  Input,
  PasswordInput,
  Textarea,
  Checkbox,
  Radio,

  // Date Input
  DateInput,

  // Select
  Select,
  Segment,

  // Chip
  Chip,

  // Avatar
  Avatar,
  AvatarGroup,

  // Status
  Status,

  // Tabs
  Tabs,
  UnderlineTabs,

  // Stepper
  Stepper,
  StepperWithLabels,

  // Modal
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  AlertModal,

  // Menu
  Menu,

  // Icons
  IconHome,
  IconSearch,
  IconMenu,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconChevronUp,
  IconArrowLeft,
  IconArrowRight,
  IconPlus,
  IconMinus,
  IconClose,
  IconCheck,
  IconEdit,
  IconTrash,
  IconCopy,
  IconDownload,
  IconUpload,
  IconRefresh,
  IconFilter,
  IconSort,
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconUser,
  IconUsers,
  IconSettings,
  IconLogout,
  IconChat,
  IconMail,
  IconBell,
  IconChart,
  IconCalendar,
  IconDocument,
  IconFolder,
  IconLink,
  IconImage,
  IconEye,
  IconEyeOff,
  IconLock,
  IconGlobe,
  IconStar,
  IconSparkles,
  IconHelp,
  IconExternalLink,
  IconDots,
} from '../components/ds';

// Auth / Figma components
import SocialAuthButton from '../components/auth/SocialAuthButton';
import OTPInput from '../components/ds/OTPInput';
import PasswordStrengthBar from '../components/auth/PasswordStrengthBar';

// ─── NAV CONFIG ──────────────────────────────────────────────────────────────

const navItems = [
  { id: 'colors', label: 'Colors', icon: IconSparkles },
  { id: 'buttons', label: 'Buttons', icon: IconPlus },
  { id: 'inputs', label: 'Inputs', icon: IconEdit },
  { id: 'dates', label: 'Date Picker', icon: IconCalendar },
  { id: 'selects', label: 'Selects', icon: IconChevronDown },
  { id: 'chips', label: 'Chips', icon: IconStar },
  { id: 'avatars', label: 'Avatars', icon: IconUser },
  { id: 'status', label: 'Status', icon: IconInfo },
  { id: 'tabs', label: 'Tabs', icon: IconMenu },
  { id: 'steppers', label: 'Steppers', icon: IconChart },
  { id: 'modals', label: 'Modals', icon: IconDocument },
  { id: 'menus', label: 'Menus', icon: IconSort },
  { id: 'icons', label: 'Icons', icon: IconGlobe },
  { id: 'auth-layout', label: 'Auth Layout', icon: IconImage },
  { id: 'social-auth', label: 'Social Auth', icon: IconUsers },
  { id: 'otp-input', label: 'OTP Input', icon: IconLock },
  { id: 'password-strength', label: 'Strength Bar', icon: IconEye },
];

// ─── LAYOUT HELPERS ──────────────────────────────────────────────────────────

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-grey-500">{title}</h2>
        {description && <p className="text-ds-sm text-grey-300 mt-0.5">{description}</p>}
      </div>
      <div className="bg-white rounded-xl border border-grey-50 shadow-ds-sm overflow-hidden">
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="text-ds-sm font-medium text-grey-400 mb-3">{title}</p>
      {children}
    </div>
  );
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      {label && <p className="text-ds-xs text-grey-300 mb-2 font-mono">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

// ─── COLOR SWATCH ────────────────────────────────────────────────────────────

function ColorSwatch({ hex, step }: { hex: string; step: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className="group flex flex-col items-center gap-1.5 cursor-pointer"
      title={`Click to copy ${hex}`}
    >
      <div
        className="w-14 h-14 rounded-lg border border-grey-50 shadow-ds-sm transition-transform duration-200 group-hover:scale-110 relative overflow-hidden"
        style={{ backgroundColor: hex }}
      >
        {copied && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <IconCheck size="sm" className="text-white" />
          </div>
        )}
      </div>
      <span className="text-[10px] text-grey-400 font-mono font-medium">{step}</span>
      <span className="text-[9px] text-grey-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity">{hex}</span>
    </button>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [toggles, setToggles] = useState({ sm: false, md: true, lg: false });
  const [selectVal, setSelectVal] = useState('');
  const [segmentVal, setSegmentVal] = useState('tab1');
  const [tabVal, setTabVal] = useState('tab1');
  const [underlineTabVal, setUnderlineTabVal] = useState('tab1');
  const [stepperStep, setStepperStep] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'info' | 'success' | 'warning' | 'error' | null>(null);
  const [checkboxes, setCheckboxes] = useState({ a: true, b: false });
  const [radioVal, setRadioVal] = useState('opt1');
  const [dateVal, setDateVal] = useState<Date | null>(null);
  const [dateVal2, setDateVal2] = useState<Date | null>(new Date());
  const [activeNav, setActiveNav] = useState('colors');
  const [otpVal, setOtpVal] = useState('');
  const [otpVal2, setOtpVal2] = useState('38');
  const [strengthPwd, setStrengthPwd] = useState('');
  const [socialComingSoon, setSocialComingSoon] = useState(true);

  return (
    <div className="min-h-screen bg-white-100 flex">
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <nav className="hidden lg:flex flex-col w-60 fixed top-0 left-0 h-screen bg-white border-r border-grey-50 z-10">
        <div className="px-5 pt-6 pb-4 border-b border-grey-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <IconSparkles size="sm" className="text-white" />
            </div>
            <div>
              <h1 className="text-ds-base font-bold text-grey-500 leading-tight">Magnetic DS</h1>
              <p className="text-[11px] text-grey-300">Design System</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-3">
          <p className="text-[10px] font-semibold text-grey-300 uppercase tracking-wider px-2 mb-2">Components</p>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const NavIcon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                  className={[
                    'flex items-center gap-2.5 px-2.5 py-2 text-ds-sm rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-500 font-medium'
                      : 'text-grey-400 hover:bg-white-200 hover:text-grey-500',
                  ].join(' ')}
                >
                  <NavIcon size="sm" className={isActive ? 'text-primary-500' : 'text-grey-200'} />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-grey-50">
          <p className="text-[10px] text-grey-300">
            16 components &middot; 40+ icons
          </p>
        </div>
      </nav>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <main className="flex-1 lg:ml-60 px-6 lg:px-10 py-8 max-w-5xl space-y-10">
        {/* Header */}
        <div className="bg-white rounded-xl border border-grey-50 shadow-ds-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-grey-500">Magnetic Design System</h1>
              <p className="text-ds-sm text-grey-300 mt-1">
                Libreria de componentes extraida de Figma. Fuente de verdad para UI consistente.
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-50 text-primary-500">
              v1.0
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-md bg-white-200 text-grey-400">
              <IconFolder size="xs" className="text-grey-300" /> src/components/ds/
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-md bg-white-200 text-grey-400">
              <IconDocument size="xs" className="text-grey-300" /> tokens.ts
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-md bg-white-200 text-grey-400">
              <IconLink size="xs" className="text-grey-300" /> tailwind.config.js
            </span>
          </div>
        </div>

        {/* ─── COLORS ──────────────────────────────────────────────────── */}
        <Section id="colors" title="Colors" description="Paleta completa del design system. Click en cualquier swatch para copiar el hex.">
          {(Object.entries(colors) as [string, Record<string, string>][]).map(([name, scale]) => (
            <div key={name} className="mb-6 last:mb-0">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: Object.values(scale)[Math.min(4, Object.keys(scale).length - 1)] }} />
                <p className="text-ds-sm font-semibold text-grey-500 capitalize">{name}</p>
                <span className="text-[10px] text-grey-300 font-mono">{Object.keys(scale).length} shades</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.entries(scale).map(([step, hex]) => (
                  <ColorSwatch key={step} hex={hex} step={step} />
                ))}
              </div>
            </div>
          ))}
        </Section>

        {/* ─── BUTTONS ─────────────────────────────────────────────────── */}
        <Section id="buttons" title="Buttons" description="Botones, icon buttons y toggles. 7 variantes, 3 tamanos.">
          <SubSection title="Variants">
            <Row>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="info">Info</Button>
              <Button variant="link">Link</Button>
            </Row>
          </SubSection>

          <SubSection title="Sizes">
            <Row>
              <Button size="lg">Large (48px)</Button>
              <Button size="md">Medium (40px)</Button>
              <Button size="sm">Small (36px)</Button>
            </Row>
          </SubSection>

          <SubSection title="With Icons">
            <Row>
              <Button leftIcon={<IconSearch size="sm" />}>Search</Button>
              <Button variant="outline" rightIcon={<IconChevronRight size="sm" />}>Next</Button>
              <Button variant="secondary" leftIcon={<IconPlus size="sm" />}>Create</Button>
            </Row>
          </SubSection>

          <SubSection title="States">
            <Row>
              <Button isLoading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>Disabled Outline</Button>
              <Button fullWidth variant="primary">Full Width</Button>
            </Row>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Icon Buttons">
            <Row>
              <IconButton icon={<IconEdit size="sm" />} aria-label="Edit" />
              <IconButton icon={<IconTrash size="sm" />} aria-label="Delete" variant="danger" />
              <IconButton icon={<IconPlus size="sm" />} aria-label="Add" variant="primary" />
              <IconButton icon={<IconSettings size="sm" />} aria-label="Settings" variant="ghost" />
              <IconButton icon={<IconDots size="sm" />} aria-label="More" size="sm" />
            </Row>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Toggle">
            <Row>
              <div className="flex items-center gap-2">
                <Toggle size="sm" checked={toggles.sm} onChange={(v) => setToggles({ ...toggles, sm: v })} />
                <span className="text-ds-sm text-grey-400">SM</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle size="md" checked={toggles.md} onChange={(v) => setToggles({ ...toggles, md: v })} />
                <span className="text-ds-sm text-grey-400">MD</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle size="lg" checked={toggles.lg} onChange={(v) => setToggles({ ...toggles, lg: v })} />
                <span className="text-ds-sm text-grey-400">LG</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle disabled />
                <span className="text-ds-sm text-grey-300">Disabled</span>
              </div>
            </Row>
          </SubSection>
        </Section>

        {/* ─── INPUTS ──────────────────────────────────────────────────── */}
        <Section id="inputs" title="Inputs" description="Text inputs, password, textarea, checkbox y radio.">
          <SubSection title="Sizes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Large" size="lg" placeholder="Type here..." />
              <Input label="Medium" size="md" placeholder="Type here..." />
              <Input label="Small" size="sm" placeholder="Type here..." />
            </div>
          </SubSection>

          <SubSection title="States">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Default" placeholder="Default input" />
              <Input label="With Error" placeholder="Error input" error="This field is required" />
              <Input label="Disabled" placeholder="Disabled" disabled />
            </div>
          </SubSection>

          <SubSection title="With Icons & Addons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Left Icon" placeholder="Search..." leftIcon={<IconSearch size="sm" />} />
              <Input label="Right Icon" placeholder="Email" rightIcon={<IconMail size="sm" />} />
              <Input label="Left Addon" placeholder="domain.com" leftAddon="https://" />
              <Input label="Helper Text" placeholder="john@example.com" helperText="We'll never share your email" />
            </div>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Password Input">
            <div className="max-w-sm">
              <PasswordInput label="Password" placeholder="Enter password" />
            </div>
          </SubSection>

          <SubSection title="Textarea">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Textarea label="Description" placeholder="Write a description..." helperText="Max 500 characters" />
              <Textarea label="With Error" placeholder="..." error="Description is required" />
            </div>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Checkbox">
            <Row>
              <Checkbox
                label="Checked"
                checked={checkboxes.a}
                onChange={() => setCheckboxes({ ...checkboxes, a: !checkboxes.a })}
              />
              <Checkbox
                label="Unchecked"
                checked={checkboxes.b}
                onChange={() => setCheckboxes({ ...checkboxes, b: !checkboxes.b })}
              />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled checked" checked disabled />
              <Checkbox label="Small" size="sm" checked />
            </Row>
          </SubSection>

          <SubSection title="Radio">
            <Row>
              <Radio label="Option 1" name="demo" value="opt1" checked={radioVal === 'opt1'} onChange={() => setRadioVal('opt1')} />
              <Radio label="Option 2" name="demo" value="opt2" checked={radioVal === 'opt2'} onChange={() => setRadioVal('opt2')} />
              <Radio label="Option 3" name="demo" value="opt3" checked={radioVal === 'opt3'} onChange={() => setRadioVal('opt3')} />
              <Radio label="Disabled" disabled />
            </Row>
          </SubSection>
        </Section>

        {/* ─── DATE PICKER ──────────────────────────────────────────────── */}
        <Section id="dates" title="Date Picker" description="Selector de fecha con calendario dropdown. Specs del SVG: 267px, rounded-lg.">
          <SubSection title="Sizes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DateInput label="Large" size="lg" placeholder="Select date..." value={dateVal} onChange={setDateVal} />
              <DateInput label="Medium" size="md" placeholder="Select date..." value={dateVal} onChange={setDateVal} />
              <DateInput label="Small" size="sm" placeholder="Select date..." value={dateVal} onChange={setDateVal} />
            </div>
          </SubSection>

          <SubSection title="States">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DateInput label="With Value" value={dateVal2} onChange={setDateVal2} />
              <DateInput label="With Error" error="Date is required" />
              <DateInput label="Disabled" disabled value={new Date()} />
            </div>
          </SubSection>

          <SubSection title="With Constraints">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateInput label="Min Date (today)" minDate={new Date()} helperText="Cannot select past dates" />
              <DateInput label="Max Date (today)" maxDate={new Date()} helperText="Cannot select future dates" />
            </div>
          </SubSection>
        </Section>

        {/* ─── SELECTS ─────────────────────────────────────────────────── */}
        <Section id="selects" title="Selects" description="Dropdowns y segment controls.">
          <SubSection title="Select Dropdown">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Country"
                placeholder="Select a country..."
                options={[
                  { value: 'co', label: 'Colombia' },
                  { value: 'us', label: 'United States' },
                  { value: 'br', label: 'Brazil' },
                  { value: 'mx', label: 'Mexico' },
                ]}
                value={selectVal}
                onChange={setSelectVal}
              />
              <Select
                label="With Error"
                error="Required"
                options={[{ value: 'a', label: 'Option A' }]}
              />
              <Select
                label="Disabled"
                disabled
                options={[{ value: 'a', label: 'Option A' }]}
                value="a"
              />
            </div>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Segment Control">
            <Row>
              <Segment
                options={[
                  { value: 'tab1', label: 'Tab 1' },
                  { value: 'tab2', label: 'Tab 2' },
                  { value: 'tab3', label: 'Tab 3' },
                ]}
                value={segmentVal}
                onChange={setSegmentVal}
              />
            </Row>
            <Row label="Sizes">
              <Segment options={[{ value: 'a', label: 'Large' }, { value: 'b', label: 'LG' }]} value="a" onChange={() => {}} size="lg" />
              <Segment options={[{ value: 'a', label: 'Medium' }, { value: 'b', label: 'MD' }]} value="a" onChange={() => {}} size="md" />
              <Segment options={[{ value: 'a', label: 'Small' }, { value: 'b', label: 'SM' }]} value="a" onChange={() => {}} size="sm" />
            </Row>
          </SubSection>
        </Section>

        {/* ─── CHIPS ───────────────────────────────────────────────────── */}
        <Section id="chips" title="Chips" description="Tags, badges y filtros removibles.">
          <SubSection title="Variants">
            <Row>
              <Chip variant="default">Default</Chip>
              <Chip variant="primary">Primary</Chip>
              <Chip variant="secondary">Secondary</Chip>
              <Chip variant="success">Success</Chip>
              <Chip variant="error">Error</Chip>
              <Chip variant="warning">Warning</Chip>
            </Row>
          </SubSection>

          <SubSection title="Sizes & Features">
            <Row>
              <Chip size="md">Medium</Chip>
              <Chip size="sm">Small</Chip>
              <Chip variant="primary" removable onRemove={() => {}}>Removable</Chip>
              <Chip variant="success" leftIcon={<IconCheck size="xs" />}>With Icon</Chip>
              <Chip disabled>Disabled</Chip>
            </Row>
          </SubSection>
        </Section>

        {/* ─── AVATARS ─────────────────────────────────────────────────── */}
        <Section id="avatars" title="Avatars" description="Avatares circulares con iniciales, status y agrupacion.">
          <SubSection title="Sizes">
            <Row>
              <div className="flex items-end gap-4">
                {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <Avatar name={size.toUpperCase()} size={size} />
                    <span className="text-[10px] text-grey-300 font-mono">{size}</span>
                  </div>
                ))}
              </div>
            </Row>
          </SubSection>

          <SubSection title="Colors">
            <Row>
              {(['primary', 'secondary', 'grey', 'error', 'warning', 'success'] as const).map((color) => (
                <div key={color} className="flex flex-col items-center gap-2">
                  <Avatar name={color.charAt(0).toUpperCase() + color.slice(1)} color={color} />
                  <span className="text-[10px] text-grey-300 font-mono">{color}</span>
                </div>
              ))}
            </Row>
          </SubSection>

          <SubSection title="With Status">
            <Row>
              <Avatar name="Online" size="lg" status="online" />
              <Avatar name="Offline" size="lg" color="grey" status="offline" />
              <Avatar name="Error" size="lg" color="error" status="error" />
              <Avatar name="Warning" size="lg" color="warning" status="warning" />
            </Row>
          </SubSection>

          <SubSection title="Avatar Group">
            <Row>
              <AvatarGroup max={3} size="md">
                <Avatar name="Ana Lopez" color="primary" />
                <Avatar name="Juan Perez" color="secondary" />
                <Avatar name="Maria Garcia" color="success" />
                <Avatar name="Carlos Ruiz" color="warning" />
                <Avatar name="Sofia Torres" color="error" />
              </AvatarGroup>
            </Row>
          </SubSection>
        </Section>

        {/* ─── STATUS ──────────────────────────────────────────────────── */}
        <Section id="status" title="Status" description="Indicadores de estado con dot y badge variants.">
          <SubSection title="Dot Variant">
            <Row>
              <Status type="active" label="Active" />
              <Status type="inactive" label="Inactive" />
              <Status type="error" label="Error" />
              <Status type="warning" label="Warning" />
            </Row>
          </SubSection>

          <SubSection title="Badge Variant">
            <Row>
              <Status type="active" variant="badge" label="Connected" />
              <Status type="inactive" variant="badge" label="Disconnected" />
              <Status type="error" variant="badge" label="Failed" />
              <Status type="warning" variant="badge" label="Pending" />
            </Row>
          </SubSection>

          <SubSection title="With Pulse">
            <Row>
              <Status type="active" variant="badge" label="Live" pulse />
              <Status type="error" label="Alert" pulse />
            </Row>
          </SubSection>
        </Section>

        {/* ─── TABS ────────────────────────────────────────────────────── */}
        <Section id="tabs" title="Tabs" description="Tabs tipo pills y underline. Container + item sizes del SVG.">
          <SubSection title="Pills Tabs">
            <Row>
              <Tabs
                items={[
                  { value: 'tab1', label: 'Overview' },
                  { value: 'tab2', label: 'Analytics', badge: 3 },
                  { value: 'tab3', label: 'Reports' },
                  { value: 'tab4', label: 'Disabled', disabled: true },
                ]}
                value={tabVal}
                onChange={setTabVal}
              />
            </Row>
            <Row label="Sizes">
              <Tabs items={[{ value: 'a', label: 'LG (48px)' }, { value: 'b', label: 'Tab' }]} value="a" onChange={() => {}} size="lg" />
              <Tabs items={[{ value: 'a', label: 'MD (40px)' }, { value: 'b', label: 'Tab' }]} value="a" onChange={() => {}} size="md" />
              <Tabs items={[{ value: 'a', label: 'SM (30px)' }, { value: 'b', label: 'Tab' }]} value="a" onChange={() => {}} size="sm" />
            </Row>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Underline Tabs">
            <UnderlineTabs
              items={[
                { value: 'tab1', label: 'General' },
                { value: 'tab2', label: 'Security', badge: 2 },
                { value: 'tab3', label: 'Notifications' },
              ]}
              value={underlineTabVal}
              onChange={setUnderlineTabVal}
            />
          </SubSection>
        </Section>

        {/* ─── STEPPERS ────────────────────────────────────────────────── */}
        <Section id="steppers" title="Steppers" description="Barras de progreso y steps con labels. Conector: 5px.">
          <SubSection title="Progress Bar">
            <div className="space-y-4 max-w-md">
              <Stepper steps={4} currentStep={1} />
              <Stepper steps={4} currentStep={2} />
              <Stepper steps={4} currentStep={3} />
              <Stepper steps={4} currentStep={4} />
            </div>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="With Labels (Interactive)">
            <div className="max-w-lg">
              <StepperWithLabels
                steps={[
                  { label: 'Info' },
                  { label: 'Review' },
                  { label: 'Confirm' },
                  { label: 'Done' },
                ]}
                currentStep={stepperStep}
              />
              <div className="flex gap-2 mt-6">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStepperStep(Math.max(1, stepperStep - 1))}
                  disabled={stepperStep <= 1}
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  onClick={() => setStepperStep(Math.min(5, stepperStep + 1))}
                  disabled={stepperStep > 4}
                >
                  Next
                </Button>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* ─── MODALS ──────────────────────────────────────────────────── */}
        <Section id="modals" title="Modals" description="Modales estandar y alertas con 4 tipos.">
          <SubSection title="Standard Modal">
            <Row>
              <Button variant="outline" onClick={() => setModalOpen(true)}>Open Modal</Button>
            </Row>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} size="md">
              <ModalHeader onClose={() => setModalOpen(false)}>Modal Title</ModalHeader>
              <ModalBody>
                <p className="text-ds-sm text-grey-400">
                  Standard modal with header, body and footer. Supports Escape to close and overlay click dismiss.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={() => setModalOpen(false)}>Confirm</Button>
              </ModalFooter>
            </Modal>
          </SubSection>

          <SubSection title="Alert Modals">
            <Row>
              <Button variant="info" onClick={() => setAlertType('info')}>Info</Button>
              <Button variant="primary" onClick={() => setAlertType('success')}>Success</Button>
              <Button variant="outline" onClick={() => setAlertType('warning')}>Warning</Button>
              <Button variant="danger" onClick={() => setAlertType('error')}>Error</Button>
            </Row>
            {alertType && (
              <AlertModal
                isOpen={!!alertType}
                onClose={() => setAlertType(null)}
                onConfirm={() => setAlertType(null)}
                type={alertType}
                title={`${alertType.charAt(0).toUpperCase() + alertType.slice(1)} Alert`}
                message="This is a demonstration of the alert modal component."
                confirmLabel="Got it"
                cancelLabel="Close"
              />
            )}
          </SubSection>
        </Section>

        {/* ─── MENUS ───────────────────────────────────────────────────── */}
        <Section id="menus" title="Menus" description="Dropdown menus con acciones, checkboxes y dividers.">
          <Row>
            <Menu
              trigger={<Button variant="outline" rightIcon={<IconChevronDown size="sm" />}>Actions</Button>}
              items={[
                { id: 'edit', label: 'Edit', icon: <IconEdit size="sm" /> },
                { id: 'copy', label: 'Duplicate', icon: <IconCopy size="sm" /> },
                { id: 'download', label: 'Download', icon: <IconDownload size="sm" /> },
                { id: 'div', label: '', divider: true },
                { id: 'delete', label: 'Delete', icon: <IconTrash size="sm" />, danger: true },
              ]}
            />

            <Menu
              trigger={<IconButton icon={<IconDots size="sm" />} aria-label="More" />}
              items={[
                { id: 'opt1', label: 'Show complete', type: 'checkbox', checked: true },
                { id: 'opt2', label: 'Show archived', type: 'checkbox', checked: false },
                { id: 'div', label: '', divider: true },
                { id: 'settings', label: 'Settings', icon: <IconSettings size="sm" /> },
              ]}
              align="left"
            />
          </Row>
        </Section>

        {/* ─── ICONS ───────────────────────────────────────────────────── */}
        <Section id="icons" title="Icons" description="40+ iconos con 4 tamanos. strokeWidth: 1.66667.">
          <SubSection title="All Icons">
            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 gap-1">
              {([
                ['Home', IconHome],
                ['Search', IconSearch],
                ['Menu', IconMenu],
                ['ChevDown', IconChevronDown],
                ['ChevRight', IconChevronRight],
                ['ChevLeft', IconChevronLeft],
                ['ChevUp', IconChevronUp],
                ['ArrowL', IconArrowLeft],
                ['ArrowR', IconArrowRight],
                ['Plus', IconPlus],
                ['Minus', IconMinus],
                ['Close', IconClose],
                ['Check', IconCheck],
                ['Edit', IconEdit],
                ['Trash', IconTrash],
                ['Copy', IconCopy],
                ['Download', IconDownload],
                ['Upload', IconUpload],
                ['Refresh', IconRefresh],
                ['Filter', IconFilter],
                ['Sort', IconSort],
                ['Info', IconInfo],
                ['Warning', IconWarning],
                ['Error', IconError],
                ['Success', IconSuccess],
                ['User', IconUser],
                ['Users', IconUsers],
                ['Settings', IconSettings],
                ['Logout', IconLogout],
                ['Chat', IconChat],
                ['Mail', IconMail],
                ['Bell', IconBell],
                ['Chart', IconChart],
                ['Calendar', IconCalendar],
                ['Document', IconDocument],
                ['Folder', IconFolder],
                ['Link', IconLink],
                ['Image', IconImage],
                ['Eye', IconEye],
                ['EyeOff', IconEyeOff],
                ['Lock', IconLock],
                ['Globe', IconGlobe],
                ['Star', IconStar],
                ['Sparkles', IconSparkles],
                ['Help', IconHelp],
                ['ExtLink', IconExternalLink],
                ['Dots', IconDots],
              ] as [string, React.ComponentType<{ size?: string; className?: string }>][]).map(
                ([name, Icon]) => (
                  <div
                    key={name}
                    className="flex flex-col items-center gap-1 p-2.5 rounded-lg hover:bg-white-200 transition-colors group cursor-default"
                    title={name}
                  >
                    <Icon size="md" className="text-grey-400 group-hover:text-primary-500 transition-colors" />
                    <span className="text-[9px] text-grey-300 group-hover:text-grey-400 font-mono text-center leading-tight transition-colors">{name}</span>
                  </div>
                )
              )}
            </div>
          </SubSection>

          <div className="h-px bg-grey-50 my-6" />

          <SubSection title="Icon Sizes">
            <div className="flex items-end gap-6">
              {([
                ['xs', '14px'],
                ['sm', '16px'],
                ['md', '20px'],
                ['lg', '24px'],
              ] as const).map(([size, px]) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white-200">
                    <IconStar size={size} className="text-grey-500" />
                  </div>
                  <span className="text-[11px] text-grey-400 font-mono font-medium">{size}</span>
                  <span className="text-[10px] text-grey-300">{px}</span>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* ─── AUTH LAYOUT ────────────────────────────────────────────── */}
        <Section id="auth-layout" title="Auth Layout" description="Layout split para pantallas de autenticacion. Imagen izquierda, formulario derecha. Back button pill.">
          <SubSection title="Preview (miniatura)">
            <div className="border border-grey-50 rounded-lg overflow-hidden" style={{ height: 320 }}>
              <div className="flex h-full">
                {/* Left image mock */}
                <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center">
                  <span className="text-white/60 text-sm font-medium">magnetic-background.webp</span>
                </div>
                {/* Right form mock */}
                <div className="flex-1 flex flex-col bg-white">
                  <div className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-grey-500 border border-grey-50 rounded-full">
                      <IconArrowLeft size="xs" /> Atras
                    </span>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-6">
                    <div className="w-full max-w-[200px] space-y-3">
                      <div className="h-5 bg-grey-50 rounded w-3/4 mx-auto" />
                      <div className="h-3 bg-grey-50 rounded w-1/2 mx-auto" />
                      <div className="h-8 bg-white-200 rounded border border-grey-50" />
                      <div className="h-8 bg-white-200 rounded border border-grey-50" />
                      <div className="h-8 bg-primary-500 rounded" />
                    </div>
                  </div>
                  <div className="pb-4 flex justify-center">
                    <div className="h-4 w-24 bg-grey-50 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </SubSection>

          <SubSection title="Propiedades">
            <div className="space-y-2 text-ds-sm">
              <Row label="children: ReactNode">
                <Chip variant="primary" size="sm">Requerido</Chip>
                <span className="text-grey-400">Contenido del formulario</span>
              </Row>
              <Row label="onBack?: () => void">
                <Chip variant="secondary" size="sm">Opcional</Chip>
                <span className="text-grey-400">Muestra boton back pill si se proporciona</span>
              </Row>
            </div>
          </SubSection>

          <SubSection title="Uso">
            <div className="bg-white-100 rounded-lg p-4 font-mono text-ds-sm text-grey-400">
              <p className="text-grey-300">{'// Con back button'}</p>
              <p>{'<AuthLayout onBack={() => navigate("/login")}>'}</p>
              <p className="pl-4 text-primary-500">{'<LoginForm />'}</p>
              <p>{'</AuthLayout>'}</p>
              <p className="mt-2 text-grey-300">{'// Sin back button (paso 1)'}</p>
              <p>{'<AuthLayout>'}</p>
              <p className="pl-4 text-primary-500">{'<WelcomeContent />'}</p>
              <p>{'</AuthLayout>'}</p>
            </div>
          </SubSection>
        </Section>

        {/* ─── SOCIAL AUTH BUTTONS ───────────────────────────────────────── */}
        <Section id="social-auth" title="Social Auth Buttons" description="Botones de autenticacion social. Google, Facebook, Apple con estado 'Proximamente'.">
          <SubSection title="Providers">
            <div className="flex gap-3 max-w-lg">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="facebook" />
              <SocialAuthButton provider="apple" />
            </div>
          </SubSection>

          <SubSection title="Coming Soon (hover para tooltip)">
            <div className="flex items-center gap-3 mb-4">
              <Toggle size="sm" checked={socialComingSoon} onChange={setSocialComingSoon} />
              <span className="text-ds-sm text-grey-400">comingSoon: {socialComingSoon ? 'true' : 'false'}</span>
            </div>
            <div className="flex gap-3 max-w-lg">
              <SocialAuthButton provider="google" comingSoon={socialComingSoon} />
              <SocialAuthButton provider="facebook" comingSoon={socialComingSoon} />
              <SocialAuthButton provider="apple" comingSoon={socialComingSoon} />
            </div>
          </SubSection>

          <SubSection title="Full Width">
            <div className="max-w-sm space-y-2">
              <SocialAuthButton provider="google" fullWidth />
              <SocialAuthButton provider="facebook" fullWidth />
              <SocialAuthButton provider="apple" fullWidth />
            </div>
          </SubSection>

          <SubSection title="Custom Labels">
            <div className="flex gap-3 max-w-lg">
              <SocialAuthButton provider="google" label="Continuar con Google" />
              <SocialAuthButton provider="facebook" label="Facebook Login" />
            </div>
          </SubSection>
        </Section>

        {/* ─── OTP INPUT ─────────────────────────────────────────────────── */}
        <Section id="otp-input" title="OTP Input" description="Input de codigo de verificacion. 6 digitos con auto-avance, paste y navegacion por teclado.">
          <SubSection title="Default (6 digitos)">
            <OTPInput value={otpVal} onChange={setOtpVal} />
            <p className="text-ds-xs text-grey-300 mt-3 text-center font-mono">
              Valor: "{otpVal}" ({otpVal.length}/6)
            </p>
          </SubSection>

          <SubSection title="Pre-llenado parcial">
            <OTPInput value={otpVal2} onChange={setOtpVal2} />
          </SubSection>

          <SubSection title="Con error">
            <OTPInput value="123" onChange={() => {}} error="Codigo incorrecto. Intenta de nuevo." />
          </SubSection>

          <SubSection title="Disabled">
            <OTPInput value="482916" onChange={() => {}} disabled />
          </SubSection>

          <SubSection title="4 digitos">
            <OTPInput length={4} value="" onChange={() => {}} />
          </SubSection>
        </Section>

        {/* ─── PASSWORD STRENGTH BAR ─────────────────────────────────────── */}
        <Section id="password-strength" title="Password Strength Bar" description="Barra de fuerza de contrasena con checklist de validaciones. Se usa en registro, reset password y cambiar contrasena.">
          <SubSection title="Interactivo">
            <div className="max-w-sm space-y-4">
              <Input
                label="Escribe una contrasena"
                placeholder="Prueba diferentes combinaciones..."
                value={strengthPwd}
                onChange={(e) => setStrengthPwd(e.target.value)}
              />
              <PasswordStrengthBar password={strengthPwd} />
            </div>
          </SubSection>

          <SubSection title="Niveles de fuerza">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div>
                <p className="text-ds-xs text-grey-300 mb-2 font-mono">Weak (1 criterio)</p>
                <PasswordStrengthBar password="abc" />
              </div>
              <div>
                <p className="text-ds-xs text-grey-300 mb-2 font-mono">Weak (2 criterios)</p>
                <PasswordStrengthBar password="abcABC" />
              </div>
              <div>
                <p className="text-ds-xs text-grey-300 mb-2 font-mono">Medium (3 criterios)</p>
                <PasswordStrengthBar password="abcABC1" />
              </div>
              <div>
                <p className="text-ds-xs text-grey-300 mb-2 font-mono">Strong (4 criterios)</p>
                <PasswordStrengthBar password="abcABC12" />
              </div>
            </div>
          </SubSection>

          <SubSection title="Criterios de validacion">
            <div className="bg-white-100 rounded-lg p-4 text-ds-sm text-grey-400 space-y-1">
              <p><Chip variant="success" size="sm">hasLowerCase</Chip> Al menos una minuscula (a-z)</p>
              <p><Chip variant="success" size="sm">hasUpperCase</Chip> Al menos una mayuscula (A-Z)</p>
              <p><Chip variant="success" size="sm">hasNumber</Chip> Al menos un numero (0-9)</p>
              <p><Chip variant="success" size="sm">minLength</Chip> Minimo 8 caracteres</p>
            </div>
          </SubSection>
        </Section>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <div className="pt-6 pb-10 border-t border-grey-50">
          <div className="flex items-center justify-between">
            <p className="text-ds-xs text-grey-300">
              Magnetic Design System &middot; Tokens + Components + Icons + Auth
            </p>
            <p className="text-[10px] text-grey-200 font-mono">
              src/components/ds/ &middot; src/components/auth/
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
