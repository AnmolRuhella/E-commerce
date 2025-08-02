import NonProtectedLayout from './layout/NonProtectedLayout';
import LoginCard from './component/LoginCard'
export default function Login() {
  return (
    <NonProtectedLayout>
      <LoginCard />
    </NonProtectedLayout>
  );
}