export interface TimeRangePickerProps {
  time: TimeRange;
  toText?: string;
  onChange?: (values: TimeRange) => void;
  editable?: boolean;
}

interface TimeRange {
  from: Date | null;
  to: Date | null;
}
