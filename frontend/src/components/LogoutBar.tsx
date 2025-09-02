"use client";

export function LogoutBar() {
  const logout = () => { localStorage.removeItem('auth.basic'); location.href = '/login'; };
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-end h-10 px-4 text-sm">
        <button onClick={logout} className="text-muted-foreground hover:underline">Logout</button>
      </div>
    </header>
  );
}
