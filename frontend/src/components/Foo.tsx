import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/auth"

interface User {
  id: string
  email: string
}

const Foo = () => {

  const { data } = useQuery({
    queryKey:['users'],
    queryFn: getUser
  })

  return (
    <div>

      {data.map((user: User)=> (
        <div key={user.id}>{user.email}</div>
      ))}

    </div>
  )
}

export default Foo
