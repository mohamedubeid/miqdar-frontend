
import EmblaCarousel from '@/components/product-details/EmblaCarousel'
import FavoriteButton from '@/components/product-details/FavoriteButton';
import ShareButton from '@/components/product-details/ShareButton';
import DownloadDesignModal from '@/components/product-details/DownloadDesignModal';
import { EmblaOptionsType } from 'embla-carousel'
import { Check, Download } from 'lucide-react'
import { getProductById, getDesignFile } from '@/actions/products';
import { DesignFile } from '@/lib/definitions';

const OPTIONS: EmblaOptionsType = {
  dragFree: false,
  // direction: 'rtl',
  loop: false
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const { id } = await params
  const productRes = await getProductById(id);
  if (!productRes || !productRes.product) return;
  const product = productRes.product;
  let images: string[] = [];
  try {
    images = product.images ? JSON.parse(product.images).map((path: string) => path.replace(/\\/g, '/')) : [];
  } catch (error) {
    console.error("Failed to parse images:", error);
  }
  const [objFile, stepFile] = await Promise.all([
    getDesignFile({ productId: product.id.toString(), format: 'obj' }),
    getDesignFile({ productId: product.id.toString(), format: 'step' }),
  ]);

  const designFileObj: DesignFile[] = objFile?.download_url
  ? [
      {
        original_name: `design.obj`,
        download_link: objFile.download_url,
      },
    ]
  : [];

  const designFileStep: DesignFile[] = stepFile?.download_url
  ? [
      {
        original_name: `design.step`,
        download_link: stepFile.download_url,
      },
    ]
  : [];

  if(!productRes || !productRes.product) return;
  return (
    <div className="surface-box px-2 py-19">
      <div className="container mx-auto p-6 bg-white rounded-[16px]">

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h3>{productRes?.product.name_ar}</h3>
            <p className="text-cstm-gray">{productRes?.product.name_en}</p>
          </div>
          <DownloadDesignModal
            productId={productRes?.product.id}
            design_file_stl={productRes?.product.design_file_stl}
            design_file_obj={designFileObj}
            design_file_fbx={productRes?.product.design_file_fbx}
            design_file_step={designFileStep}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <div className="flex-1">
            <EmblaCarousel options={OPTIONS} images={images} />
            {productRes?.product.download_count !== null && productRes?.product.download_count !== undefined && (
              <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-white border border-primary rounded-lg w-fit">
                <span className="text-primary font-medium">
                  تم تنزيل المنتج ({productRes.product.download_count})
                </span>
                <Download size={20} className="text-primary" />
              </div>
            )} 
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-y-8">
              <div>
                <h4 className="border-r-4 border-primary ps-4">الوصف</h4>
                <p
                  className="text-cstm-gray mt-4"
                  dangerouslySetInnerHTML={{ __html: productRes?.product.description || '' }}
                />
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">التصنيف</h4>
                <div className="flex items-center gap-4 mt-4">
                  <div className="rounded-full bg-[#F3F4F6] px-4 py-2">
                    <p className="text-sm">{productRes?.product.category_name ?? 'category name'}</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">المواصفات</h4>
                <div className="flex flex-wrap gap-y-4 mt-4">
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">الطول:</span> <span className="font-semibold">{productRes?.product.height_mm} مم</span></p>
                  </div>
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">الوزن:</span> <span className="font-semibold">{productRes?.product.weight_g} كجم</span></p>
                  </div>
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">العرض:</span> <span className="font-semibold">{productRes?.product.width_mm} مم</span></p>
                  </div>
                  <div className="flex-1/2">
                    <p><span className="text-cstm-gray">الارتفاع:</span> <span className="font-semibold">{productRes?.product.depth_mm} مم</span></p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">المواد المستخدمة</h4>
                <div className="flex flex-col gap-y-4 mt-4">
                  {productRes.product?.materials?.length > 0 ? (
                    productRes.product?.materials.map((material) => (
                      <div key={material.id} className="flex items-center gap-x-2">
                        <div className="rounded-full bg-primary p-0.5">
                          <Check size={12} strokeWidth={4} className="text-white" />
                        </div>
                        <p>{material.name}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">لا توجد مواد مضافة لهذا المنتج</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="border-r-4 border-primary ps-4">ملاحظات</h4>
                <div className="flex flex-col gap-y-4 mt-4">
                  <p
                    className="text-cstm-gray mt-4"
                    dangerouslySetInnerHTML={{ __html: productRes?.product.notes || '' }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-between items-center gap-4 mt-4">
                {/* <button className="primary-button !bg-[#1F2937] hover:!bg-[#1F2937cc] !border-none hover:!text-white">
                  <Pencil size={16} />
                  <span>تعديل القياسات</span>
                </button> */}
                {/* <button className="primary-button">
                  <Ruler size={16} />
                  <span>تحليل التصميم</span>
                </button> */}
                <div className="flex items-center gap-4">
                  <ShareButton />
                  <FavoriteButton product={productRes?.product}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;