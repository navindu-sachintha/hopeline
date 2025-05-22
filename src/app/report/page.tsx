import CyberbullyingReportForm from "@/components/Report/ReportForm/ReportForm";

const ReportPage = () => {
  return(
    <div>
      <p className="text-center">Please consider Your anonymous reports are subjected to take any action only with verifiable evidence <span className="text-red-600">*</span></p>
      <CyberbullyingReportForm />
    </div>
  )
}

export default ReportPage;