import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag, ArrowLeft, Github, ChevronRight } from "lucide-react"
import { ShareButtons } from "@/components/ShareButtons"

const posts = {
  "ai-mental-health-analyzer": {
    title: "How I Built an AI Mental Health Analyzer",
    description:
      "A deep dive into building an NLP system that detects emotional signals in text using machine learning.",
    category: "AI & Machine Learning",
    date: "2024-12-15",
    readTime: "8 min read",
    image: "/projects/health.png",
    content: `
## The Problem

Mental health issues affect millions globally, yet early detection remains a challenge. Traditional screening relies on self-reporting questionnaires, which can be subjective and infrequent. I wanted to explore whether Natural Language Processing could analyze text patterns to identify emotional signals—potentially enabling earlier intervention.

## Approach & Architecture

The system uses a multi-stage pipeline:

### 1. Data Collection & Preprocessing

We collected anonymized text data from public mental health forums and clinical datasets. Preprocessing included:

- **Tokenization** using spaCy's clinical model
- **Negation handling** (critical for phrases like "not depressed")
- **Context window preservation** to maintain semantic meaning

### 2. Feature Engineering

We extracted both linguistic and semantic features:

\`\`\`python
def extract_features(text: str) -> Dict[str, float]:
    doc = nlp(text)

    features = {
        # Linguistic features
        "avg_sentence_length": np.mean([len(s) for s in doc.sents]),
        "first_person_ratio": count_first_person(doc) / len(doc),
        "negation_count": count_negations(doc),

        # Emotional lexicon scores
        "liwc_anxiety": score_lexicon(doc, LIWC_ANXIETY),
        "liwc_depression": score_lexicon(doc, LIWC_DEPRESSION),
        "liwc_anger": score_lexicon(doc, LIWC_ANGER),

        # Embedding features
        "sentence_embeddings": get_sentence_embeddings(doc),
    }
    return features
\`\`\`

### 3. Model Architecture

We experimented with three approaches:

| Model | F1 Score | Inference Time |
|-------|----------|----------------|
| TF-IDF + Logistic Regression | 0.72 | 12ms |
| BiLSTM + Attention | 0.81 | 45ms |
| **DistilBERT Fine-tuned** | **0.87** | **28ms** |

The DistilBERT model provided the best balance of accuracy and latency for real-time use.

\`\`\`python
class MentalHealthClassifier(nn.Module):
    def __init__(self, num_labels=4):
        super().__init__()
        self.bert = DistilBertModel.from_pretrained('distilbert-base-uncased')
        self.dropout = nn.Dropout(0.3)
        self.classifier = nn.Linear(768, num_labels)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        pooled = outputs.last_hidden_state[:, 0]  # CLS token
        return self.classifier(self.dropout(pooled))
\`\`\`

## Key Challenges

### Class Imbalance

Mental health datasets are heavily imbalanced—most texts are "neutral." We used:

- **Weighted loss functions** with inverse frequency weighting
- **SMOTE oversampling** for minority classes
- **Threshold tuning** per class on validation set

### Context Sensitivity

Phrases like "I'm feeling blue" vs "The walls are blue" require context. Our solution:

- **Sentence-level classification** with document-level aggregation
- **Attention visualization** to verify model focus
- **Human-in-the-loop validation** on edge cases

## Deployment & Monitoring

The model serves via a **Streamlit dashboard** with:

- Real-time text analysis with confidence scores
- Batch processing for clinical notes
- Drift detection on input distributions
- Automated retraining pipeline (monthly)

![Mental Health Analyzer Dashboard](/projects/health.png)

## Results & Impact

- **87% F1 score** on held-out clinical test set
- **Sub-30ms latency** for single predictions
- Deployed as a **screening aid** (not diagnostic) for university counseling center pilot

## Lessons Learned

1. **Domain expertise matters** — Clinical psychologists on the team caught false positives we'd missed
2. **Explainability builds trust** — Attention heatmaps helped clinicians understand predictions
3. **Privacy by design** — All processing happens client-side; no data leaves the browser

## What's Next

- Multilingual support (starting with Spanish)
- Integration with EHR systems via FHIR
- Longitudinal tracking for treatment monitoring

---

*This project was built as part of my research into AI-assisted mental health tools. The code is open source on [GitHub](https://github.com/Artemiz0307/mental-health-analyzer).*
`,
  },

  "time-series-anomaly-detection": {
    title: "Detecting Anomalies in Time Series Data",
    description:
      "Learn how anomaly detection models monitor sensor data and detect unusual patterns in real time.",
    category: "Data Science",
    date: "2024-11-28",
    readTime: "6 min read",
    image: "/projects/forecast.jpg",
    content: `
## Introduction

Time series anomaly detection is critical for monitoring infrastructure, IoT sensors, financial transactions, and industrial systems. This post covers the techniques I used to build a production anomaly detection system.

## Types of Anomalies

### Point Anomalies
Single data points that deviate significantly from the norm.

### Contextual Anomalies
Points that are anomalous in a specific context (e.g., high CPU at 3 AM vs 3 PM).

### Collective Anomalies
A sequence of points that together indicate anomalous behavior.

## Methods Explored

### Statistical Methods

**Z-Score / Modified Z-Score**
\`\`\`python
def modified_z_score(data: np.ndarray, threshold: float = 3.5) -> np.ndarray:
    median = np.median(data)
    mad = np.median(np.abs(data - median))
    return 0.6745 * (data - median) / mad
\`\`\`

**ARIMA Residuals**
Fit ARIMA model, flag large residuals.

### Machine Learning Approaches

**Isolation Forest**
Effective for high-dimensional data, works without labels.

\`\`\`python
from sklearn.ensemble import IsolationForest

model = IsolationForest(contamination=0.01, random_state=42)
anomaly_scores = model.fit_predict(X)
\`\`\`

**LSTM Autoencoder**
Reconstructs normal patterns; high reconstruction error = anomaly.

\`\`\`python
class LSTMAutoencoder(nn.Module):
    def __init__(self, input_dim, hidden_dim=64, latent_dim=32):
        super().__init__()
        self.encoder = nn.LSTM(input_dim, hidden_dim, batch_first=True)
        self.latent = nn.Linear(hidden_dim, latent_dim)
        self.decoder = nn.LSTM(latent_dim, hidden_dim, batch_first=True)
        self.output = nn.Linear(hidden_dim, input_dim)

    def forward(self, x):
        _, (h_n, _) = self.encoder(x)
        z = self.latent(h_n[-1])
        z_seq = z.unsqueeze(1).repeat(1, x.size(1), 1)
        decoded, _ = self.decoder(z_seq)
        return self.output(decoded)
\`\`\`

## Production Considerations

### Real-time Processing
- **Sliding window inference** (window=60, stride=1)
- **Streaming via Kafka** → Flink → Model Server
- **Sub-100ms latency** requirement

### Alerting Strategy
- **Multi-level alerts**: Warning → Critical → Page
- **Alert grouping** to reduce noise
- **Automated root cause analysis** via feature attribution

### Model Monitoring
- **Data drift detection** (KS test on feature distributions)
- **Concept drift** (performance on labeled samples)
- **Automated retraining** weekly with human review

## Results

| Metric | Value |
|--------|-------|
| Precision | 0.91 |
| Recall | 0.84 |
| F1 Score | 0.87 |
| False Positive Rate | 2.3% |
| Avg Detection Latency | 47ms |

---

*Full implementation available on [GitHub](https://github.com/Artemiz0307/ai-smart-grid-monitoring).*
`,
  },

  "building-saas-with-supabase": {
    title: "Building SaaS with Supabase and React",
    description:
      "A guide on building scalable SaaS platforms using React, Supabase and modern backend architecture.",
    category: "Full Stack",
    date: "2024-10-20",
    readTime: "10 min read",
    image: "/projects/scholarship.png",
    content: `
## Why Supabase?

After building several SaaS products, I've found Supabase strikes the right balance:

- **PostgreSQL** — Full SQL power, no vendor lock-in
- **Auth** — Row Level Security, OAuth, magic links
- **Realtime** — WebSocket subscriptions out of the box
- **Storage** — S3-compatible with CDN
- **Edge Functions** — Deno-based, globally distributed

## Architecture Overview

\`\`\`mermaid
graph TB
    Client[React App] --> Auth[Supabase Auth]
    Client --> API[Supabase Client]
    API --> DB[(PostgreSQL)]
    API --> Realtime[Realtime Engine]
    API --> Storage[S3 Storage]
    API --> Edge[Edge Functions]
\`\`\`

## Database Design Patterns

### Multi-tenancy with RLS

\`\`\`sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: users see only their org's projects
CREATE POLICY "org_isolation" ON projects
  FOR ALL USING (
    organization_id IN (
      SELECT organization_id FROM user_organizations
      WHERE user_id = auth.uid()
    )
  );
\`\`\`

### Subscription & Billing Schema

\`\`\`sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  price_id TEXT,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook handler for Stripe events
CREATE OR REPLACE FUNCTION handle_stripe_webhook()
RETURNS TRIGGER AS $$
BEGIN
  -- Update subscription status from Stripe events
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
\`\`\`

## React Integration

### Supabase Client Setup

\`\`\`typescript
// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
\`\`\`

### Auth Hook with Session Management

\`\`\`typescript
// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, session, loading }
}
\`\`\`

### Realtime Subscriptions

\`\`\`typescript
// Real-time project updates
useEffect(() => {
  const channel = supabase
    .channel('project-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'projects' },
      (payload) => {
        queryClient.invalidateQueries({ queryKey: ['projects'] })
      }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}, [])
\`\`\`

## Deployment Checklist

- [ ] **RLS policies** on all tables
- [ ] **Database indexes** on foreign keys & query columns
- [ ] **Connection pooling** via PgBouncer (Supabase handles this)
- [ ] **Edge Functions** for CPU-intensive tasks
- [ ] **Caching strategy** (React Query + HTTP caching)
- [ ] **Monitoring** (Supabase logs + custom events)
- [ ] **Backup strategy** (Point-in-time recovery enabled)

## Performance Tips

1. **Select only needed columns** — \`.select('id, name, created_at')\`
2. **Use RPC functions** for complex queries
3. **Batch mutations** — Supabase supports bulk operations
4. **Enable compression** — Automatic with Supabase client

---

*Building a SaaS? Check out my [Coupon Management System](https://github.com/Artemiz0307/coupon_management_system) for a complete example with billing, teams, and admin dashboard.*
`,
  },
}

type Params = {
  slug: string
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function generateToc(content: string) {
  const headings = content.match(/^##\s+(.+)$/gm) || []
  return headings.map((h) => {
    const text = h.replace(/^##\s+/, "")
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    return { text, id }
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug as keyof typeof posts]

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["WebzerCode"],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeBuffer: string[] = []
  let codeLang = ""

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block start/end
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLang = line.slice(3).trim() || "text"
        codeBuffer = []
      } else {
        inCodeBlock = false
        elements.push(
          <pre key={`code-${i}`} className="bg-gray-950 dark:bg-gray-900 rounded-xl p-5 overflow-x-auto mb-6 border border-gray-700 dark:border-gray-700">
            <code className={`language-${codeLang} text-sm leading-relaxed`}>
              {codeBuffer.join("\n")}
            </code>
          </pre>
        )
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} id={line.slice(4).toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="text-xl font-semibold text-black dark:text-white mt-10 mb-4">
          {line.slice(4)}
        </h3>
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} id={line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="text-2xl font-bold text-black dark:text-white mt-12 mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
          {line.slice(3)}
        </h2>
      )
    }
    // Horizontal rule
    else if (line.trim() === "---") {
      elements.push(<hr key={i} className="my-10 border-gray-200 dark:border-gray-800" />)
    }
    // Table
    else if (line.includes("|") && line.includes("---")) {
      // Simple table parsing - handled as pre for now
      elements.push(
        <pre key={i} className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto mb-6 text-sm font-mono">
          {line}
        </pre>
      )
    }
    // Bold/italic inline (basic)
    else if (line.trim()) {
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code class='bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>")

      elements.push(
        <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />
      )
    }
  }

  return elements
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = posts[slug as keyof typeof posts]

  if (!post) {
    return notFound()
  }

  const toc = generateToc(post.content)

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          id="progress-bar"
          className="h-full bg-blue-600 origin-left transition-all duration-100"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <article className="max-w-4xl mx-auto px-6 py-20">
        {/* Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              <Tag size={10} />
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            {post.description}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-16">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
        </div>

        {/* Main Content + TOC */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Mobile */}
          <div className="lg:hidden mb-8">
            <details className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <summary className="font-semibold text-black dark:text-white cursor-pointer flex items-center justify-between">
                Table of Contents
                <ChevronRight size={16} className="transition-transform" />
              </summary>
              <nav className="mt-4 space-y-2">
                {toc.map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </details>
          </div>

          {/* Content */}
          <div className="flex-1 prose prose-lg dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {renderContent(post.content)}
            </div>
          </div>

          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <h4 className="font-semibold text-black dark:text-white mb-4 uppercase tracking-wider text-xs">
                  On this page
                </h4>
                <nav className="space-y-2">
                  {toc.map((item, i) => (
                    <a
                      key={i}
                      href={`#${item.id}`}
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pl-2 border-l-2 border-transparent hover:border-blue-500"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Share */}
              <div className="mt-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <h4 className="font-semibold text-black dark:text-white mb-4 uppercase tracking-wider text-xs">
                  Share
                </h4>
                <div className="flex gap-3">
                  <ShareButtons post={post} />
                  <a
                    href={`https://github.com/Artemiz0307`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                    aria-label="View on GitHub"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Author Bio */}
        <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              W
            </div>
            <div>
              <h4 className="text-lg font-semibold text-black dark:text-white">WebzerCode</h4>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                Building scalable web applications, AI systems, and high-performance digital platforms.
              </p>
              <div className="flex gap-4 mt-3">
                <a href="https://github.com/Artemiz0307" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  GitHub
                </a>
                <a href="#contact" className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(posts)
              .filter(([s]) => s !== slug)
              .map(([s, p]) => (
                <Link
                  key={s}
                  href={`/blog/${s}`}
                  className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="50vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{p.category}</span>
                    <h3 className="font-semibold text-black dark:text-white mt-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 md:p-12 bg-black dark:bg-white rounded-2xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-black mb-4">
            Enjoyed this article?
          </h3>
          <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-xl mx-auto">
            Get the next deep-dive delivered straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-xl text-white dark:text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </article>

      {/* Scroll Progress Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const bar = document.getElementById('progress-bar');
              if (!bar) return;
              window.addEventListener('scroll', () => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollTop / docHeight;
                bar.style.transform = 'scaleX(' + progress + ')';
              });
            })();
          `,
        }}
      />
    </main>
  )
}