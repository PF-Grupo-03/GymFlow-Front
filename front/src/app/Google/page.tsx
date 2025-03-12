import { useSearchParams } from "next/navigation";

const Google = () => {
      const searchParams = useSearchParams();
      const userToken = searchParams.get("token"); 
      const userId = searchParams.get("id");

      return (<>
        <div>
            {userToken}
            {userId}
        </div>
      </>)
}

export default Google