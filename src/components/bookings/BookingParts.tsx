import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import type { BookingStatus } from '@/contexts/DemoStore';

export const TIMES = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

const STATUS_STYLE: Record<BookingStatus, string> = {
  pending: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
  confirmed: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100',
  completed: 'bg-sky-100 text-sky-800 hover:bg-sky-100',
  cancelled: 'bg-gray-200 text-gray-700 hover:bg-gray-200',
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return <Badge className={`capitalize ${STATUS_STYLE[status]}`}>{status}</Badge>;
}

export function Stars({ value, onChange, size = 'h-5 w-5' }: { value: number; onChange?: (v: number) => void; size?: string }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          disabled={!onChange}
          onClick={() => onChange?.(n)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star className={`${size} ${n <= value ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
        </button>
      ))}
    </div>
  );
}

export function DateTimePicker({ date, time, onDate, onTime }: { date?: Date; time: string | null; onDate: (d?: Date) => void; onTime: (t: string) => void }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <div className="space-y-4">
      <div>
        <Label>Select date</Label>
        <Calendar mode="single" selected={date} onSelect={onDate} className="rounded-md border mt-2"
          disabled={(d) => d < today || d.getDay() === 0} />
      </div>
      <div>
        <Label>Select time</Label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {TIMES.map((t) => (
            <Button key={t} type="button" size="sm" variant={time === t ? 'default' : 'outline'} onClick={() => onTime(t)}>{t}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RescheduleDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (d: Date, t: string) => void }) {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Reschedule booking</DialogTitle></DialogHeader>
        <DateTimePicker date={date} time={time} onDate={setDate} onTime={setTime} />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button disabled={!date || !time} onClick={() => { onSave(date!, time!); onOpenChange(false); }}>Save new time</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RateDialog({ open, onOpenChange, onSave }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (r: number, text: string) => void }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Rate your experience</DialogTitle></DialogHeader>
        <Stars value={rating} onChange={setRating} size="h-8 w-8" />
        <Textarea placeholder="What went well? What could be better?" value={text} onChange={(e) => setText(e.target.value)} />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => { onSave(rating, text.trim()); onOpenChange(false); }}>Submit review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const fmtDay = (iso: string) => new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
export const fmtAgo = (iso: string) => {
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
};
