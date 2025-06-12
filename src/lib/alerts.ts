import { toast } from '@/components/ui/use-toast'

export function showAccessDeniedAlert() {
  toast({
    title: 'Access Denied',
    description: 'You do not have permission to access this resource.'
  })
}
