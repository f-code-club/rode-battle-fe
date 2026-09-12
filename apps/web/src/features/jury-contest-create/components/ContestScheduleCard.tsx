import { cn } from '@/lib/utils';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { AlertCircle, Calendar, Clock } from 'lucide-react';
import { Controller, useWatch, type UseFormReturn } from 'react-hook-form';
import type { CreateContestFormData } from '../schemas/contest.schema';
import { computeDurationInfo } from '../utils/duration';

interface ContestScheduleCardProps {
  form: UseFormReturn<CreateContestFormData>;
}

export default function ContestScheduleCard({ form }: ContestScheduleCardProps) {
  const {
    control,
    formState: { errors },
  } = form;

  const startTime = useWatch({ control, name: 'start' });
  const endTime = useWatch({ control, name: 'end' });

  const durationInfo = computeDurationInfo(startTime, endTime);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <Calendar size={20} />
        </div>
        <h3 className="text-base font-bold text-gray-900">Timeline & Schedule</h3>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="contest-start" className="mb-1.5 block text-sm font-semibold text-gray-800">
            Start Time <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="start"
            render={({ field }) => (
              <DatePicker
                id="contest-start"
                showTime={{ format: 'HH:mm' }}
                format="DD/MM/YYYY HH:mm"
                placeholder="DD/MM/YYYY HH:mm"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                className={cn(
                  'h-11 w-full rounded-lg border-gray-200 text-sm shadow-2xs',
                  errors.start && '!border-red-500',
                )}
                needConfirm={false}
              />
            )}
          />
          {errors.start?.message && <p className="mt-1 text-xs text-red-500">{errors.start.message}</p>}
        </div>

        <div>
          <label htmlFor="contest-end" className="mb-1.5 block text-sm font-semibold text-gray-800">
            End Time <span className="text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="end"
            render={({ field }) => (
              <DatePicker
                id="contest-end"
                showTime={{ format: 'HH:mm' }}
                format="DD/MM/YYYY HH:mm"
                placeholder="DD/MM/YYYY HH:mm"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => field.onChange(date ? date.toISOString() : '')}
                className={cn(
                  'h-11 w-full rounded-lg border-gray-200 text-sm shadow-2xs',
                  errors.end && '!border-red-500',
                )}
                needConfirm={false}
              />
            )}
          />
          {errors.end?.message && <p className="mt-1 text-xs text-red-500">{errors.end.message}</p>}
        </div>
      </div>

      {durationInfo.text && (
        <div className="mt-5">
          {durationInfo.valid ? (
            <div className="flex items-center gap-2.5 rounded-lg border border-emerald-100 bg-emerald-50/70 p-3 text-xs text-emerald-800">
              <Clock size={16} className="shrink-0 text-emerald-600" />
              <div>
                <span className="font-semibold">Calculated Duration:</span> {durationInfo.text}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-800">
              <AlertCircle size={16} className="shrink-0 text-amber-600" />
              <div>
                <span className="font-semibold">Notice:</span> {durationInfo.text}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
