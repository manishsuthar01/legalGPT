import { useState } from "react"


export default function useContractChat() {

    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState("");
    let contractId = undefined;

    const startChat = async ({ message }: { message: string }) => {
        try {
            if (!message) return;
            setLoading(true)
            const res = await fetch(`api/contract/${contractId}/chat`)

        } catch (error) {

        } finally {

        }

    }


    return {

    }
}