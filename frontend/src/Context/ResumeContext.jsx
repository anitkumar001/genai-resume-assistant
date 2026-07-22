import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export function ResumeProvider({ children }) {

    const [resumeText, setResumeText] = useState("");

    return (
        <ResumeContext.Provider
            value={{
                resumeText,
                setResumeText,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume() {
    return useContext(ResumeContext);
}