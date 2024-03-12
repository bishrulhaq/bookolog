import {Suspense} from "react";
import {getServerSession} from "next-auth"
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Lounge from "@/app/lounge/Lounge";

export const metadata = {
    title: 'Lounge',
    description: 'Exchange Books',
}

export default async function BookPage({params}) {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login')
    }

    return <Suspense fallback={<div className="text-center">
        <svg width="100" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <circle cx="15" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                         begin="0s" dur="0.8s"
                         values="15;9;15" calcMode="linear"
                         repeatCount="indefinite"/>
                <animate attributeName="fill-opacity" from="1" to="1"
                         begin="0s" dur="0.8s"
                         values="1;.5;1" calcMode="linear"
                         repeatCount="indefinite"/>
            </circle>
            <circle cx="60" cy="15" r="9" fill-opacity="0.3">
                <animate attributeName="r" from="9" to="9"
                         begin="0s" dur="0.8s"
                         values="9;15;9" calcMode="linear"
                         repeatCount="indefinite"/>
                <animate attributeName="fill-opacity" from="0.5" to="0.5"
                         begin="0s" dur="0.8s"
                         values=".5;1;.5" calcMode="linear"
                         repeatCount="indefinite"/>
            </circle>
            <circle cx="105" cy="15" r="15">
                <animate attributeName="r" from="15" to="15"
                         begin="0s" dur="0.8s"
                         values="15;9;15" calcMode="linear"
                         repeatCount="indefinite"/>
                <animate attributeName="fill-opacity" from="1" to="1"
                         begin="0s" dur="0.8s"
                         values="1;.5;1" calcMode="linear"
                         repeatCount="indefinite"/>
            </circle>
        </svg>
    </div>}>
        <Lounge user={session?.user}/>
    </Suspense>;
}