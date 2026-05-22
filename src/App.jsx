import React from "react";
import "./styles.css";

const whatsappNumber = "+55 49 6529 2798";
const whatsappUrl =
  "https://wa.me/554965292798?text=Ol%C3%A1%2C%20Lilian.%20Quero%20um%20or%C3%A7amento%20para%20um%20site%20ou%20sistema.";
const email = "contato@liliansousa.dev";
const emailUrl =
  "mailto:contato@liliansousa.dev?subject=Or%C3%A7amento%20para%20site%20ou%20sistema&body=Ol%C3%A1%2C%20Lilian.%20Quero%20um%20or%C3%A7amento.";

const services = [
  {
    title: "Landing page de captação",
    badge: "Entrega objetiva",
    text: "Página única para apresentar sua oferta, responder objeções e levar o visitante direto para o WhatsApp.",
    items: ["Copy organizada", "CTA para WhatsApp", "Versão mobile"],
  },
  {
    title: "Site profissional",
    badge: "Presença online",
    text: "Site institucional para serviços, profissionais e empresas que precisam transmitir confiança antes do contato.",
    items: ["SEO básico", "Páginas essenciais", "Publicação no domínio"],
  },
  {
    title: "Sistema simples sob medida",
    badge: "Processo interno",
    text: "Ferramentas web para controlar pedidos, leads, orçamentos ou rotinas que hoje ficam em planilhas soltas.",
    items: ["Painel responsivo", "Fluxo personalizado", "Base para evoluir"],
  },
];

const deliverables = [
  {
    title: "Estrutura pronta para contato",
    text: "Seções organizadas para explicar sua oferta, mostrar diferenciais e levar o visitante para WhatsApp ou e-mail.",
  },
  {
    title: "Publicação sem complicação",
    text: "Arquivos finais prontos para domínio e hospedagem, com orientação sobre o que manter e o que pode evoluir depois.",
  },
  {
    title: "Base técnica para crescer",
    text: "Código limpo, responsivo e leve, sem prender seu negócio a uma plataforma difícil de manter.",
  },
];

const conversionPoints = [
  "Mensagem principal clara nos primeiros segundos.",
  "Oferta explicada sem excesso de texto técnico.",
  "Botões de contato posicionados nos pontos de decisão.",
  "Design responsivo para quem chega pelo celular.",
];

const proofPoints = [
  "Briefing direto, sem reunião desnecessária.",
  "Layout pensado para celular antes do desktop.",
  "Código leve, organizado e pronto para manutenção.",
  "Contato por WhatsApp ou e-mail durante o projeto.",
];

const steps = [
  {
    title: "Diagnóstico",
    text: "Você explica o serviço, o público e o objetivo. A partir disso, eu defino a melhor estrutura para gerar contatos.",
  },
  {
    title: "Proposta",
    text: "Você recebe escopo, prazo e entregáveis. Sem pacote nebuloso, sem promessa vaga e sem surpresa no final.",
  },
  {
    title: "Construção",
    text: "Eu desenvolvo, reviso no celular e desktop, ajusto os textos principais e deixo pronto para publicação.",
  },
];

const faqs = [
  {
    question: "Preciso ter tudo escrito antes de chamar?",
    answer:
      "Não. Você pode chegar com uma ideia simples. Eu ajudo a organizar a oferta, as seções da página e o caminho até o contato.",
  },
  {
    question: "Você faz apenas layout ou também programa?",
    answer:
      "Faço a implementação. A entrega pode ser uma página estática, um site completo ou um sistema web simples, conforme o escopo.",
  },
  {
    question: "Consigo pedir orçamento pelo WhatsApp?",
    answer:
      "Sim. Envie uma mensagem com o que você vende, para quem vende e o que precisa que o site ou sistema resolva.",
  },
  {
    question: "Qual é o prazo médio de entrega?",
    answer:
      "Depende do escopo. Uma landing page simples costuma ser mais rápida; sites completos e sistemas precisam de mais etapas. A proposta informa prazo e entregáveis antes de começar.",
  },
  {
    question: "O site fica no meu domínio?",
    answer:
      "Sim. A publicação pode ser feita no domínio e hospedagem definidos para o projeto. Se você ainda não tiver isso, recebe orientação sobre o melhor caminho.",
  },
  {
    question: "Tenho suporte depois da publicação?",
    answer:
      "Sim. Ajustes e melhorias podem ser combinados depois da entrega, conforme a necessidade do projeto.",
  },
];

function App() {
  return (
    <main className="site-shell">
      <a className="skip-link" href="#inicio">
        Ir para o conteúdo
      </a>
      <nav className="topbar" aria-label="Navegação principal">
        <a className="brand" href="#inicio">
          Lilian Sousa
        </a>
        <div className="nav-links">
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
          <a href="#duvidas">Dúvidas</a>
          <a href="#contato">Contato</a>
        </div>
      </nav>

      <section id="inicio" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Desenvolvimento web para captar clientes</p>
          <h1>Sites e sistemas que transformam visitantes em conversas no WhatsApp.</h1>
          <p className="hero-text">
            Eu ajudo profissionais e pequenos negócios a sair do improviso digital
            com landing pages, sites e sistemas simples, rápidos e pensados para
            gerar contatos qualificados.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              Pedir orçamento pelo WhatsApp
            </a>
            <a className="button button-secondary" href={emailUrl}>
              Enviar briefing por e-mail
            </a>
          </div>
          <div className="hero-stats" aria-label="Diferenciais">
            <span>Carregamento rápido</span>
            <span>Funciona no celular</span>
            <span>SEO técnico</span>
            <span>Entrega clara</span>
          </div>
        </div>

        <figure className="portrait-wrap">
          <img src="/photo.png" alt="Lilian Sousa, desenvolvedora web" />
          <figcaption>
            Desenvolvimento direto com quem vai construir sua página.
          </figcaption>
        </figure>
      </section>

      <section className="section deliverables-section">
        <div className="section-heading">
          <p className="eyebrow">O que você recebe</p>
          <h2>Uma entrega pensada para gerar confiança antes do contato.</h2>
        </div>
        <div className="deliverables">
          {deliverables.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="showcase-section" aria-label="Exemplo visual de entrega">
        <div className="showcase-card">
          <img
            src="/site-preview.svg"
            alt="Ilustração de uma landing page com chamada principal, cards e botão de WhatsApp"
          />
        </div>
        <div className="showcase-copy">
          <p className="eyebrow">Página com função comercial</p>
          <h2>Bonita, rápida e construída para conduzir o visitante até o contato.</h2>
          <p>
            A página não é só uma vitrine. Ela precisa responder dúvidas, reduzir
            insegurança e deixar claro por que vale a pena chamar você agora.
          </p>
          <ul className="compact-list">
            {conversionPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="problem-band">
        <p className="eyebrow">O problema</p>
        <h2>Seu cliente decide rápido. Sua página precisa explicar rápido também.</h2>
        <p>
          Uma página confusa perde contatos mesmo quando o serviço é bom. A proposta
          aqui é simples: organizar sua oferta, mostrar valor e facilitar o próximo
          passo para quem já está interessado.
        </p>
      </section>

      <section id="servicos" className="section">
        <div className="section-heading">
          <p className="eyebrow">Ofertas</p>
          <h2>Escolha o tipo de entrega que combina com seu momento.</h2>
        </div>
        <div className="cards">
          {services.map((service) => (
            <article className="card" key={service.title}>
              <span className="card-badge">{service.badge}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">Por que funciona</p>
          <h2>Menos enfeite. Mais clareza para vender o que você faz.</h2>
          <p>
            A prioridade é construir uma experiência que carregue bem, explique o
            serviço sem rodeio e leve a pessoa certa para uma conversa comercial.
          </p>
        </div>
        <ul className="checklist">
          {proofPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="studio-section">
        <figure className="studio-photo">
          <img src="/foto-estudando.png" alt="Lilian Sousa estudando e planejando projetos web" />
        </figure>
        <div className="studio-copy">
          <p className="eyebrow">Estratégia antes do código</p>
          <h2>Antes de programar, eu organizo a mensagem que precisa vender.</h2>
          <p>
            O projeto começa entendendo sua oferta, seu público e o próximo passo
            que você quer que o visitante tome. Depois disso, layout, texto e código
            trabalham na mesma direção.
          </p>
          <div className="mini-grid">
            <span>Oferta clara</span>
            <span>Fluxo de contato</span>
            <span>Mobile primeiro</span>
          </div>
        </div>
      </section>

      <section id="processo" className="section process-section">
        <div className="process-layout">
          <div className="section-heading">
            <p className="eyebrow">Processo</p>
            <h2>Do briefing ao site publicado, com escopo claro.</h2>
          </div>
          <img
            className="process-visual"
            src="/process-visual.svg"
            alt="Ilustração do processo de diagnóstico, proposta, construção e publicação"
          />
        </div>
        <div className="timeline">
          {steps.map((step, index) => (
            <article className="timeline-item" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="duvidas" className="section faq-section">
        <div className="section-heading">
          <p className="eyebrow">Dúvidas comuns</p>
          <h2>Antes de pedir orçamento.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contato" className="final-cta">
        <div className="final-cta-copy">
          <p className="eyebrow">Comece com uma conversa</p>
          <h2>Peça um orçamento para sua página ou sistema.</h2>
          <p>
            Envie o que você vende, para quem vende e qual resultado espera. Eu
            respondo com os próximos passos para transformar isso em uma entrega real.
          </p>
        </div>
        <div className="contact-card" aria-label="Canais de contato">
          <span className="contact-label">Atendimento direto</span>
          <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
            Falar no WhatsApp
          </a>
          <a className="button button-secondary" href={emailUrl}>
            Enviar e-mail
          </a>
          <div className="contact-details">
            <span>{whatsappNumber}</span>
            <span>{email}</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <span>© 2026 Lilian Sousa Desenvolvimento Web</span>
        <span>liliansousa.dev</span>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
        WhatsApp
      </a>
    </main>
  );
}

export default App;
