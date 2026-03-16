import { ReactNode } from 'react';

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function ScreenLayout({ title, subtitle, children }: ScreenLayoutProps) {
  return (
    <main className="screen-layout">
      <header className="screen-layout__header">
        <h1>{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <section className="screen-layout__body">{children}</section>
    </main>
  );
}
