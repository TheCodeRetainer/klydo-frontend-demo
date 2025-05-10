import TransactionTabs from '../components/TransactionTabs';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <TransactionTabs />
        </div>
      </main>
    </div>
  );
}
