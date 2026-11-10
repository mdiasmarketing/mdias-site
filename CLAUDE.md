# Site MDIAS (mdiasmarketing.com.br)

Site institucional da MDIAS, separado do sistema (repositório mdias-operacional). Publicado pelo Netlify a cada push na `main` (cada publicação gasta créditos: juntar mudanças).

- HTML/CSS/JS puros, sem build. `site.css` (estilo), `site.js` (`MDIAS_ANIM`: mede a rolagem, suaviza e chama `desenhar` de cada página; `util.surge/surgePx/some`). Cada página tem o próprio script no fim.
- Páginas: `/` (abertura "AQUI A GENTE FAZ, / E ACONTECE.", frase que acende palavra por palavra, 8 cartões de serviço), `/gestao/` (Gestão de Mídias: linha do tempo do Ciclo MDIAS com 8 etapas e o pacote), `/privacidade/` (LGPD, usa o `estilo.css` antigo; a Meta usa esse endereço e `#exclusao`).
- Cartões sem página própria abrem o WhatsApp comercial (12) 99180-0871 com mensagem pronta. Página nova: trocar o href do cartão em `index.html`.
- Estilo: minimalista, preto #0A0A0A, branco e laranja #F65612; Adineue PRO (`/fonts`) nos títulos, Figtree no texto, JetBrains Mono nos sobretítulos. Sem brilhos/luzes; o movimento é palavra subindo do desfoque, cenas trocando numa tela parada (`.palco` + `.palco-tela` sticky) e rolagem suavizada.
- O rodapé precisa manter razão social (MDIAS MARKETING & PRODUCAO AUDIOVISUAL LTDA), CNPJ e telefone: a verificação da Meta confere.
- Protótipo de desenho: canvas "Site MDIAS · abertura" (artefato do Claude).
