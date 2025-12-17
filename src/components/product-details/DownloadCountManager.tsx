'use client';

import DownloadDesignModal from './DownloadDesignModal';
import { DesignFile } from '@/lib/definitions';
import { Download } from 'lucide-react';
import { useDownloadCount } from './DownloadCountProvider';

type DownloadCountManagerProps = {
  productId: number;
  design_file_stl: DesignFile[];
  design_file_obj: DesignFile[];
  design_file_fbx: DesignFile[];
  design_file_step: DesignFile[];
  variant: 'modal' | 'display';
};

const DownloadCountManager = ({
  productId,
  design_file_stl,
  design_file_obj,
  design_file_fbx,
  design_file_step,
  variant,
}: DownloadCountManagerProps) => {
  const { downloadCount, setDownloadCount } = useDownloadCount();

  if (variant === 'modal') {
    return (
      <DownloadDesignModal
        productId={productId}
        design_file_stl={design_file_stl}
        design_file_obj={design_file_obj}
        design_file_fbx={design_file_fbx}
        design_file_step={design_file_step}
        currentCount={downloadCount}
        onCountUpdate={setDownloadCount}
      />
    );
  }

  if (downloadCount === null || downloadCount === undefined) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-white border border-primary rounded-lg w-fit">
      <span className="text-primary font-medium">
        تم تنزيل المنتج ({downloadCount})
      </span>
      <Download size={20} className="text-primary" />
    </div>
  );
};

export default DownloadCountManager;
