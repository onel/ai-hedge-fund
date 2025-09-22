import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Copy, Edit, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

/**
 * Props for the FlowContextMenu component
 */
interface FlowContextMenuProps {
  /** Whether the context menu is currently visible */
  isOpen: boolean;
  /** Position coordinates where the menu should appear */
  position: { x: number; y: number };
  /** Callback function to close the menu */
  onClose: () => void;
  /** Callback function to handle edit action */
  onEdit: () => void;
  /** Callback function to handle duplicate action */
  onDuplicate: () => void;
  /** Callback function to handle delete action */
  onDelete: () => void;
}

/**
 * A context menu component that provides edit, duplicate, and delete actions for flow elements.
 * The menu appears at a specified position and closes when clicking outside or pressing Escape.
 * 
 * @param props - The component props
 * @returns The rendered context menu or null if not open
 */
export function FlowContextMenu({ 
  isOpen, 
  position, 
  onClose, 
  onEdit, 
  onDuplicate, 
  onDelete 
}: FlowContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Handles clicks outside the menu to close it
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    /**
     * Handles escape key press to close the menu
     */
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /**
   * Executes an action and closes the menu
   * @param action - The action function to execute
   */
  const handleAction = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-50 min-w-[160px] bg-ramp-grey-800 border border rounded-md shadow-lg",
        "animate-in fade-in-0 zoom-in-95"
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="p-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-primary hover-bg"
          onClick={() => handleAction(onEdit)}
        >
          <Edit size={14} className="mr-2" />
          Edit
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-primary hover:bg-ramp-grey-700"
          onClick={() => handleAction(onDuplicate)}
        >
          <Copy size={14} className="mr-2" />
          Duplicate
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-red-500 hover:bg-ramp-grey-700 hover:text-red-300"
          onClick={() => handleAction(onDelete)}
        >
          <Trash2 size={14} className="mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}