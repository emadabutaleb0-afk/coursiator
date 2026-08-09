import { Award } from 'lucide-react';

interface CertificateTemplateProps {
    studentName: string;
    courseName: string;
    completionDate: string;
    instructorName: string;
    certificateId: string;
}

export default function CertificateTemplate({
    studentName,
    courseName,
    completionDate,
    instructorName,
    certificateId,
}: CertificateTemplateProps) {
    return (
        <div className="w-full max-w-[1000px] mx-auto bg-white text-black p-8 font-serif relative overflow-hidden shadow-2xl print:shadow-none print:w-full print:max-w-none">
            {/* Border Design */}
            <div className="border-8 border-double border-[#1a237e] h-full p-8 relative">
                <div className="border-2 border-[#c5a059] h-full p-8 flex flex-col items-center justify-center text-center relative z-10">

                    {/* Header */}
                    <div className="mb-8">
                        <Award className="w-24 h-24 text-[#c5a059] mx-auto mb-4" />
                        <h1 className="text-5xl font-bold text-[#1a237e] uppercase tracking-widest mb-2">Certificate</h1>
                        <h2 className="text-2xl text-[#c5a059] uppercase tracking-wide">of Completion</h2>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 mb-12">
                        <p className="text-xl italic text-gray-600">This is to certify that</p>

                        <div className="text-4xl font-bold text-[#1a237e] border-b-2 border-gray-300 pb-2 px-12 inline-block min-w-[400px]">
                            {studentName}
                        </div>

                        <p className="text-xl italic text-gray-600">has successfully completed the course</p>

                        <div className="text-3xl font-bold text-[#1a237e]">
                            {courseName}
                        </div>

                        <p className="text-lg text-gray-600">
                            Demonstrating dedication and mastery of the subject matter.
                        </p>
                    </div>

                    {/* Footer - Signatures */}
                    <div className="flex justify-between w-full px-16 mt-8">
                        <div className="text-center">
                            <div className="text-xl font-signature text-[#1a237e] mb-2 border-b border-gray-400 pb-1 px-8">
                                {completionDate}
                            </div>
                            <p className="text-sm uppercase tracking-wider text-gray-500">Date</p>
                        </div>

                        <div className="text-center">
                            <div className="w-24 h-24 rounded-full bg-[#c5a059]/10 flex items-center justify-center mx-auto mb-2 border-2 border-[#c5a059]">
                                <span className="text-[#c5a059] font-bold text-xs uppercase text-center transform -rotate-12">
                                    Coursiator<br />Verified
                                </span>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-signature text-[#1a237e] mb-2 border-b border-gray-400 pb-1 px-8 font-script">
                                {instructorName}
                            </div>
                            <p className="text-sm uppercase tracking-wider text-gray-500">Instructor</p>
                        </div>
                    </div>

                    {/* Certificate ID */}
                    <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                        Certificate ID: {certificateId}
                    </div>
                </div>

                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <Award className="w-[500px] h-[500px]" />
                </div>
            </div>
        </div>
    );
}
