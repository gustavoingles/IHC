# Simplo (NubankVei)

> **Projeto de Interface Humano-Computador (IHC)**
> *Um clone do Nubank focado em acessibilidade para a terceira idade.*

## 👵 Sobre o Projeto

O **Simplo** (anteriormente "NubankVei") é uma reimaginação do aplicativo do Nubank, projetada especificamente para **pessoas idosas**.

Sabemos que interfaces bancárias modernas podem ser confusas, com ícones pequenos, navegação complexa e excesso de informações. O Simplo resolve isso com:
- **Fontes grandes e legíveis**: Para facilitar a leitura.
- **Contraste aprimorado**: Cores vibrantes (Laranja) e fundos claros.
- **Navegação simplificada**: Menos opções na tela, focando no essencial (Saldo, Transferência, Pagamentos).
- **Feedback claro**: Mensagens de confirmação e erro explícitas e amigáveis.
- **Linguagem acessível**: Termos simples e diretos, evitando jargões técnicos.

Este projeto demonstra como princípios de IHC podem ser aplicados para incluir digitalmente a população sênior.

---

## 🚀 Como Acessar e Testar

Você pode testar o aplicativo de três formas diferentes, dependendo da sua preferência:

### 1. Versão Web (Acesso Imediato)
Acesse o aplicativo diretamente pelo navegador, sem instalar nada. Ideal para uma visualização rápida.

🔗 **Link de Acesso:** [https://simplo-6rw007jjl-gustavos-projects-0d432d51.vercel.app](https://simplo-6rw007jjl-gustavos-projects-0d432d51.vercel.app)

### 2. Aplicativo Móvel (Android e iOS)
Para a experiência nativa completa, você pode gerar o aplicativo para o seu celular usando o EAS (Expo Application Services).

**Pré-requisitos:**
- Conta na Expo.
- EAS CLI instalado (`npm install -g eas-cli`).

**Passos para gerar o APK (Android):**
1. No terminal, execute:
   ```bash
   eas build -p android --profile preview
   ```
2. Escaneie o QR Code gerado ou baixe o APK pelo link fornecido.

**Passos para iOS (Simulador):**
1. No terminal, execute:
   ```bash
   eas build -p ios --profile preview
   ```
2. Baixe o arquivo e arraste para o Simulador iOS.

### 3. Execução Local (Desenvolvimento)
Se você quiser rodar o código fonte na sua máquina ou testar no seu celular via Expo Go.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento (modo Tunnel para maior compatibilidade):
   ```bash
   npx expo start --tunnel
   ```
3. Escaneie o QR Code com o aplicativo **Expo Go** (disponível na App Store e Google Play).

---

## 📱 Funcionalidades Principais

- **Login Simplificado**: Acesso apenas com CPF (simulado).
- **Home Intuitiva**: Saldo visível/ocultável e acesso rápido a ações.
- **Transferência Pix**: Fluxo passo-a-passo (Quem -> Quanto -> Confirmar).
- **Pagamento de Boletos**: Digitação de código com validação clara.
- **Extrato**: Histórico de transações com ícones grandes e descrições claras.
- **Ajuda**: Acesso fácil a canais de suporte (Telefone, Email).

---

## 🛠️ Tecnologias Utilizadas

- **React Native** (Expo)
- **TypeScript**
- **Expo Router** (Navegação)
- **Lucide React Native** (Ícones)
