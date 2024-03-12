import BookDetails from './BookDetails';
import {fetchBookById, fetchUserInteraction} from '@/utils';
import {Suspense} from "react";
import {getServerSession} from "next-auth"
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const fetchData = async (params) => {
    try {
        if (params?.name[1]) {
            const book = await fetchBookById(params?.name[1]);
            metadata.title = `${book?.title}`;
            metadata.description = `${book?.description}`;
            return book;

        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
};

const fetchUserInteractionData = async (params, session) => {

    try {
        if (session || params?.name[1]) {
            return await fetchUserInteraction(params?.name[1], session?.user?.id, session?.user?.j_token);
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
};

export const metadata = {
    title: '',
    description: '',
}


export default async function BookPage({params}) {

    const session = await getServerSession(authOptions);
    const book = await fetchData(params);
    const userInteraction = await fetchUserInteractionData(params, session);


    if (params?.name?.length !== 2) {
        redirect('/')
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
        <BookDetails book={book} userInteraction={userInteraction}/>
    </Suspense>;
}