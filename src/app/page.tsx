import NonProtectedLayout from './layout/NonProtectedLayout';
import LoginCard from './component/LoginCard'
export default function Home() {
  return (
    <NonProtectedLayout>
      <LoginCard />
    </NonProtectedLayout>
  );
}