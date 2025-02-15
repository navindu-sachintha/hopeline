"use client"
import { Incident } from "@/components/shared/CaseData";
import type { Roles } from "@/types/globals";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Case({params}:{
    params: {id:string}
}) {
    const [caseData, setCaseData] = useState<CaseData|null>(null);
    const {id} = params;
    const user = useUser()
    const role = user.user?.publicMetadata.role

    useEffect(() => {
        const fetchCaseData = async () => {
            try {
                const response = await axios.get(`/api/case/${id}`);
                if (response.status === 200) {
                    const caseData = response.data as CaseData;
                    setCaseData(caseData);
                }
    
            } catch (error) {
                console.error('Error fetching case data', error);
            }
        }
        void fetchCaseData();
    },[id])

    if(caseData === null) return <p>Loading...</p>
    
  return (
    <div>
        <Incident
            incident={caseData}
            role={role as Roles}
        />
    </div>
  )
}