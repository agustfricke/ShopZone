import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/auth"

const Foo = () => {

  const { data: users, isLoading } = useQuery({
    queryKey:['users'],
    queryFn: getUser
  })

  console.log(users)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.email}</div>
      ))}
    </div>
  )
}

export default Foo
