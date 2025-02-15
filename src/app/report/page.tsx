import CyberbullyingReportForm from "@/components/Report/ReportForm/ReportForm";

const ReportPage = () => {
  return(
    <div>
      <p className="text-center">Please consider Your anonymous reports are not subjected to take any action they are only for make insights <span className="text-red-600">*</span></p>
      <CyberbullyingReportForm />
    </div>
  )
}

export default ReportPage;