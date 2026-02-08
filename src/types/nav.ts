import { type LucideIcon } from 'lucide-react'

export type NavItem = {
  label: string
  href?: string
  icon: LucideIcon
  badge?: string
  disabled?: boolean
  children?: NavItem[]
}