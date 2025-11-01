import ComingSoon from '@/components/ComingSoon';
export default function Page() {
  return <ComingSoon title="AI Image Annotator" description="Tandai area tumor dan OAR pada CT/DICOM" features={['Upload DICOM files', 'Markup tools', 'OAR detection', 'Export annotations']} />;
}
