/**
 * Magnetic Design System
 * ─────────────────────────
 * Single entry point for all DS components.
 *
 * Usage:
 *   import { Button, Input, Avatar, IconSearch } from '@/components/ds';
 */

// ─── TOKENS ────────────────────────────────────────────────────────────────────
export { colors, sizes, radii, stroke, shadows, transitions } from './tokens';
export type { DSColor, DSSize } from './tokens';

// ─── BUTTON ────────────────────────────────────────────────────────────────────
export { Button, IconButton, Toggle } from './Button';
export type { ButtonProps, IconButtonProps, ButtonVariant, ButtonSize, ToggleProps } from './Button';

// ─── INPUT ─────────────────────────────────────────────────────────────────────
export { Input, PasswordInput, Textarea, Checkbox, Radio } from './Input';
export type { InputProps, TextareaProps, CheckboxProps, RadioProps, InputSize } from './Input';

// ─── DATE INPUT ─────────────────────────────────────────────────────────────────
export { DateInput } from './DateInput';
export type { DateInputProps, DateInputSize } from './DateInput';

// ─── SELECT ────────────────────────────────────────────────────────────────────
export { Select, Segment } from './Select';
export type { SelectProps, SelectOption, SelectSize, SegmentProps, SegmentOption } from './Select';

// ─── CHIP ──────────────────────────────────────────────────────────────────────
export { Chip } from './Chip';
export type { ChipProps, ChipVariant, ChipSize } from './Chip';

// ─── AVATAR ────────────────────────────────────────────────────────────────────
export { Avatar, AvatarGroup } from './Avatar';
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarColor } from './Avatar';

// ─── STATUS ────────────────────────────────────────────────────────────────────
export { Status } from './Status';
export type { StatusProps, StatusType, StatusVariant } from './Status';

// ─── TABS ──────────────────────────────────────────────────────────────────────
export { Tabs, UnderlineTabs } from './Tabs';
export type { TabsProps, TabItem, TabSize, UnderlineTabsProps } from './Tabs';

// ─── STEPPER ───────────────────────────────────────────────────────────────────
export { Stepper, StepperWithLabels } from './Stepper';
export type { StepperProps, StepperWithLabelsProps } from './Stepper';

// ─── MODAL ─────────────────────────────────────────────────────────────────────
export { Modal, ModalHeader, ModalBody, ModalFooter, AlertModal } from './Modal';
export type { ModalProps, AlertModalProps, ModalType, ModalSize } from './Modal';

// ─── MENU ──────────────────────────────────────────────────────────────────────
export { Menu } from './Menu';
export type { MenuProps, MenuItem } from './Menu';

// ─── ICONS ─────────────────────────────────────────────────────────────────────
export {
  // Navigation
  IconHome,
  IconSearch,
  IconMenu,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconChevronUp,
  IconArrowLeft,
  IconArrowRight,
  // Actions
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
  // Status / Feedback
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  // User / Account
  IconUser,
  IconUsers,
  IconSettings,
  IconLogout,
  // Communication
  IconChat,
  IconMail,
  IconBell,
  // Data / Content
  IconChart,
  IconCalendar,
  IconDocument,
  IconFolder,
  IconLink,
  IconImage,
  // Misc
  IconEye,
  IconEyeOff,
  IconLock,
  IconGlobe,
  IconStar,
  IconSparkles,
  IconHelp,
  IconExternalLink,
  IconDots,
} from './Icons';
export type { IconProps } from './Icons';
