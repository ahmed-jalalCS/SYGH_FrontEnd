// app/403/page.tsx
export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
        <p className="text-lg text-gray-700">
          عذرًا، لا تملك صلاحية الوصول إلى هذه الصفحة.
        </p>
      </div>
    </div>
  );
}
