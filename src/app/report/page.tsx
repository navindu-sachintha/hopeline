"use client"

import { Button } from "@/components/ui/button";
import { useAnonymousReportStore } from "@/store/formstore";
import { AnonymousReport } from "@/components/Report";
import { useRouter } from "next/navigation";

const ReportPage = () => {
  const router = useRouter();
  const {isFormVisible,toggleForm} = useAnonymousReportStore()
  const handleLoginRedirect = () => {
    router.push('/auth/login')
  }
  return(
    <div className="container px-12 lg:px-32 py-12 lg:py-20">
      <div>
        Please consider that when you select anonymous reporting <span className="font-bold">we can&apos;t
        get any action</span> regarding this incident.<span className="text-destructive">*</span> We only use anonymous
        reports to make insights.
      </div>
      <Button
        onClick={toggleForm}
      >Anonymous reporting</Button>
      <Button
        onClick={handleLoginRedirect}
      >Non-Anonymous reporting</Button>
      {isFormVisible && (
        <AnonymousReport/>
      )}
    </div>
  )
}

export default ReportPage;