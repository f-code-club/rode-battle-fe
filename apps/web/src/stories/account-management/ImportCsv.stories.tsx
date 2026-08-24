import ImportCsvDialog from '@/features/account-management/components/ImportCsvDialog';
import ImportPreview from '@/features/account-management/components/ImportPreview';
import type { Account } from '@/features/account-management/types';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const MOCK_ACCOUNTS: Account[] = [
  { id: '1', email: 'ducphucdn2006@gmail.com', name: 'Phạm Đức Phúc', role: 'participant', is_banned: false },
  { id: '2', email: 'hs23t2@gmail.com', name: 'Trần Trọng Nghĩa', role: 'participant', is_banned: false },
  { id: '3', email: 'nhatminhvo2311@gmail.com', name: 'Võ Nhật Minh', role: 'participant', is_banned: false },
  { id: '4', email: 'uttrinh4115@gmail.com', name: 'Đào Thị Út Trinh', role: 'participant', is_banned: false },
  { id: '5', email: 'tuanvinh2402@gmail.com', name: 'Nguyễn Tuấn Vinh', role: 'participant', is_banned: false },
  { id: '6', email: 'lam01662052827@gmail.com', name: 'Nguyễn Đức Bảo Lâm', role: 'participant', is_banned: false },
  { id: '7', email: 'phamhoangtuanqn@gmail.com', name: 'Phạm Hoàng Tuấn', role: 'jury', is_banned: false },
  { id: '8', email: 'nguyenduchuy23052006@gmail.com', name: 'Nguyễn Đức Huy', role: 'jury', is_banned: false },
];

function ImportCsvDialogStory() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
      >
        Open Import CSV
      </button>
      <ImportCsvDialog
        open={open}
        onOpenChange={setOpen}
        onFileSelected={(file) => alert(`File selected: ${file.name} (${file.size} bytes)`)}
      />
    </div>
  );
}

function ImportPreviewStory() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
      >
        Open Preview
      </button>
      <ImportPreview
        open={open}
        onOpenChange={setOpen}
        accounts={MOCK_ACCOUNTS}
        onConfirm={(accounts) => console.warn('Confirm:', accounts)}
      />
    </div>
  );
}

const meta: Meta = {
  title: 'Pages/ImportCSV',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const UploadDialog: StoryObj = {
  name: '1. Upload CSV Dialog',
  render: () => <ImportCsvDialogStory />,
};

export const PreviewDialog: StoryObj = {
  name: '2. Preview Accounts',
  render: () => <ImportPreviewStory />,
};
