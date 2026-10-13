# Thoni Arquitetura — Landing Page Oficial

Site oficial e landing page de alta conversão da arquiteta **Meryellen Thoni Melotto** (**Thoni Arquitetura**), especializado em arquitetura comercial (consultórios, clínicas, estética, beleza) e projetos residenciais no Sul Fluminense (Volta Redonda e região) e projetos remotos em todo o Brasil.

---

## 🎨 Design & Estilo
- **Inspiração & Estrutura:** Inspirado diretamente no layout editorial de impacto com tipografia gigante, blocos de grade em preto e branco e interações imersivas.
- **Tipografia:** Fontes Google **Outfit** (pesos 700 a 900 nos títulos) e **Inter** (300 a 500 no corpo de texto).
- **Paleta de Cores:** Fundo Preto Profundo (`#0D0D0D`), Branco Puro (`#FFFFFF`) e cor de destaque em **Rosa Chá** (`#D4A396`), conferindo sofisticação e suavidade à marca.
- **Microinterações:**
  - Cursor magnético e fluido (desativado automaticamente em telas touch/mobile).
  - Revelação de imagens de projeto em 3D ao passar o mouse sobre cada pilar.
  - Portfólio de projetos em carrossel horizontal contínuo.
  - Seção de **Perguntas Frequentes (FAQs)** em acordeão interativo.
  - Barra dinâmica Marquee contínua no rodapé.
  - Botão de WhatsApp flutuante direto.

---

## 📁 Estrutura de Pastas de Imagens na Raiz

Para facilitar o envio para o GitHub sem estourar limites de upload:

As imagens agora ficam organizadas **diretamente na pasta raiz do site**, dentro de `images/`:

```
thoni-arq/
├── index.html          (Página principal pronta)
├── style.css           (Folha de estilos completa)
├── script.js           (Scripts do cursor, FAQ e animações)
└── images/             (Subpastas com todas as imagens leves e otimizadas)
    ├── logo/
    │   ├── icone-preto.png
    │   ├── icone-rose.png
    │   ├── logo-clara.png
    │   └── logo-roxa.png
    ├── about/
    │   ├── mery-1.jpg
    │   ├── mery-2.jpg
    │   └── ...
    └── portfolio/
        ├── clinica-odonto-1.jpg ...
        ├── clinica-vet-1.jpg ...
        ├── salao-1.jpg ...
        └── residencial1-1.jpg ...
```

> **Dica para o GitHub:** Você pode subir primeiro a pasta `images/logo`, depois a pasta `images/about` e em seguida `images/portfolio`. Todas as fotos foram comprimidas (todas pesam menos de 500 KB, em vez de 15 MB) e os caminhos relativos (`images/portfolio/...`) **nunca irão quebrar**!

---

## 🚀 Como Visualizar e Testar
Basta abrir o arquivo [`index.html`](file:///C:/Users/Romano/.gemini/antigravity/scratch/thoni-arq/index.html) diretamente no seu navegador, ou rodar com qualquer servidor local (Live Server no VS Code, ou `npx serve .`).
