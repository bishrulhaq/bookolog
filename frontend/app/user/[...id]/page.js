import {fetchUserByUUID} from "@/utils";
import {redirect} from "next/navigation";
import UserDetails from "@/app/user/[...id]/userDetails";

const fetchData = async (params) => {
    try {
        if (params?.id) {
            return await fetchUserByUUID(params?.id);
        } else {
            return null;
        }

    } catch (error) {
        return null;
    }
};

export default async function UserProfile({params}) {

    const user = await fetchData(params);

    if (!params?.id || !user?.data) {
        redirect('/');
    }

    return (<>
        <UserDetails user={user}></UserDetails>
    </>)
}