import type { BlogPost } from '@/types/blog';

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const demoPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How I Think About Backend System Design',
    slug: 'how-i-think-about-backend-system-design',
    excerpt: 'A practical framework for breaking an open-ended system design problem into requirements, APIs, data, scaling, reliability and trade-offs.',
    content: `System design becomes much easier when you stop treating it as a technology shopping exercise. The goal is not to mention Kafka, Redis, Kubernetes or a dozen AWS services. The goal is to build a system that satisfies a clear set of requirements and to explain why every important component exists.

Start with the problem, not the architecture. I first write down the functional requirements: what users can do, what data the system must create, and what the important workflows are. Then I separate non-functional requirements such as latency, availability, durability, consistency, security and expected traffic. This prevents a common mistake in interviews and real projects: designing for millions of requests per second when the actual workload is a few hundred requests per minute.

The next step is to estimate scale. Even rough numbers are useful. If an application has 100,000 users and 5 percent are active each day, that is 5,000 daily active users. If each active user generates 20 requests, the system handles roughly 100,000 requests per day. Average traffic is only about 1.2 requests per second. Peak traffic may be ten or twenty times higher, but that still gives us a very different architecture from a global social network. Capacity estimates make later choices defensible.

Once the requirements and scale are clear, I define the core API boundaries. Each API should represent a business operation rather than exposing database tables directly. For example, a return-management system might expose create return, approve return, cancel return and get return status. The API contract should define validation, idempotency expectations, response codes and failure behaviour before we decide how the internals are implemented.

Data modelling comes next. I usually start with the source of truth and ask what relationships and consistency guarantees the business needs. A relational database is a strong default when transactions, constraints and joins are important. A document or key-value store becomes attractive when the access pattern is predictable and the data is naturally aggregate-oriented. The important question is not whether one database is fashionable; it is whether the data model matches the workload.

Then I look at concurrency and consistency. If two requests can modify the same business entity, we need an explicit strategy. Optimistic locking can detect conflicting updates. Pessimistic locking can serialize critical sections. An idempotency key can make retries safe. A unique database constraint can prevent duplicate records. These mechanisms solve different problems, so saying that a system is simply thread-safe is not enough.

Caching should be introduced only when there is a clear reason. A cache is useful when data is read frequently and can tolerate a defined amount of staleness, or when an expensive computation can be reused. The design must also answer what happens when the cache is empty, stale or unavailable. Cache invalidation is part of the design, not an implementation detail that can be postponed indefinitely.

Asynchronous processing is another tool, not an architectural goal. Kafka or a queue makes sense when work can be decoupled from the request path, when consumers need independent scaling, when events need to be replayed, or when multiple downstream systems need the same business event. If a simple synchronous database transaction already satisfies the requirement, adding a message broker creates more failure modes without adding useful value.

When introducing events, I define the event semantics carefully. A message should represent a meaningful business fact such as ReturnCreated or PaymentCaptured. Consumers should be idempotent because retries are normal in distributed systems. Offsets, acknowledgements, dead-letter handling and observability all matter. The producer and consumer should also have a clear contract about schema evolution so that one deployment does not unexpectedly break another service.

Reliability is where a design starts becoming production-ready. For every important dependency I ask what happens when it times out, returns an error, becomes slow or disappears. Timeouts prevent a slow dependency from consuming every application thread. Retries can recover transient failures, but they need bounded attempts and backoff. Circuit breakers can stop repeated calls to an unhealthy dependency. Bulkheads can prevent one overloaded workflow from exhausting resources needed by other workflows.

Observability should be designed alongside the system. Logs explain individual events, metrics show aggregate behaviour, and traces connect work across services. Useful metrics include request rate, latency percentiles, error rate, queue depth, database connection usage and cache hit rate. A dashboard without actionable alerts is not enough; the team should know which symptoms require investigation and which are expected variations.

Security also belongs in the first design pass. Authentication answers who the caller is, while authorization answers what that caller can do. Sensitive information should not be written into logs. APIs should validate input and enforce appropriate rate limits. Secrets should come from a secure configuration mechanism rather than source control. For an administrative system, the public application should never be able to bypass the authentication and authorization boundary.

Finally, I review the design through failure scenarios. What happens if the database is unavailable during order creation? What happens if the client retries after a timeout even though the first request succeeded? What happens if an event is delivered twice? What happens if a consumer is down for two hours? What happens if a deployment changes an event schema? These questions often reveal more about the quality of a design than the happy path does.

My preferred system-design structure is therefore simple: requirements, scale, APIs, data model, core flow, concurrency, asynchronous boundaries, caching, reliability, security, observability and trade-offs. The technologies come after the reasoning. A strong design is not the one with the most boxes on the diagram; it is the one where every box has a clear job and the failure behaviour is understandable.`,
    category: 'System Design',
    tags: ['Architecture', 'Scalability', 'Reliability'],
    series: 'System Design Fundamentals',
    seriesOrder: 1,
    publishedAt: '2026-08-18',
    readingTime: '10 min read',
    status: 'published'
  },
  {
    id: '2',
    title: 'Java Concurrency: The Mental Model I Use',
    slug: 'java-concurrency-mental-model',
    excerpt: 'A clear way to reason about threads, executors, locks, atomics and asynchronous work in Java without memorising isolated APIs.',
    content: `Java concurrency becomes much easier when you separate three questions: what state is shared, where work is executed, and how concurrent operations coordinate. Most concurrency bugs happen because these questions are mixed together. A thread pool does not make shared state safe, and synchronized does not decide how much work should run concurrently.

The first concept is shared mutable state. If two threads only read immutable data, there is usually no coordination problem. The difficulty appears when multiple threads can modify the same value or object. For example, incrementing a counter looks like one operation but actually involves reading the old value, calculating a new value and writing it back. Two threads can interleave those steps and lose an update.

This is why visibility and atomicity matter separately. Visibility means that one thread can reliably observe a value written by another thread. Atomicity means an operation behaves as one indivisible unit. The volatile keyword helps with visibility and ordering for a variable, but it does not make compound operations such as count++ atomic. AtomicInteger is appropriate when the required operation is a supported atomic update such as incrementAndGet or compareAndSet.

Locks solve a broader class of problems because they protect a critical section. With synchronized, only one thread can execute the protected section for the same monitor at a time. ReentrantLock provides additional capabilities such as tryLock, interruptible lock acquisition and explicit lock management. The choice should follow the coordination requirement, not a belief that one mechanism is automatically faster.

A common mistake is protecting only one method while leaving another method able to mutate the same state without the lock. Thread safety belongs to the shared state and its invariants. If a bank account requires that balance never become negative, every operation that can violate that invariant must participate in the same synchronization strategy.

ExecutorService addresses a different problem: execution policy. Creating a new thread for every task is expensive and makes resource usage difficult to control. An executor lets the application submit tasks to a bounded pool of reusable workers. A fixed thread pool is useful when the concurrency level should remain controlled. A scheduled executor is useful for delayed or periodic work. The important operational question is what happens when the queue fills up or tasks take longer than expected.

Thread-pool sizing should reflect the workload. CPU-bound tasks generally benefit from a pool close to the number of available processors. I/O-bound tasks can use more concurrency because threads spend time waiting, but the external dependency still imposes a limit. If a database supports only a small number of connections, increasing the application thread pool indefinitely simply creates more waiting threads and more contention.

CompletableFuture is useful when asynchronous operations need composition. Instead of manually creating threads, an application can express a pipeline such as fetch customer, then fetch orders, then combine the results. But asynchronous code does not remove resource limits. If every request starts several blocking operations on an undersized executor, latency can become worse rather than better.

I also distinguish parallelism from asynchrony. Parallelism means work is executed at the same time on multiple processors or workers. Asynchrony means the caller does not have to block waiting for completion. A single-threaded event loop can be asynchronous without being parallel, while a batch computation can be parallel but still expose a synchronous API to its caller.

Concurrent collections are another important tool. ConcurrentHashMap allows safe concurrent access without locking the entire map for every operation. CopyOnWriteArrayList is useful when reads vastly outnumber writes because readers can iterate over a stable snapshot, but frequent writes make copying expensive. Choosing a concurrent collection should be based on the access pattern rather than simply replacing every HashMap with ConcurrentHashMap.

Deadlocks are usually caused by inconsistent lock ordering. Imagine one thread holding lock A and waiting for B while another holds B and waits for A. Neither can progress. A practical prevention strategy is to define a global lock ordering and always acquire multiple locks in that order. tryLock with a timeout can also make some failure modes observable instead of waiting forever.

Backpressure is equally important in production systems. Suppose an API receives requests faster than a worker can process them. If the application accepts unlimited work, memory eventually becomes the bottleneck. Bounded queues, rejection policies and rate limits turn uncontrolled growth into a predictable failure mode. It is often healthier to reject or defer work than to allow the entire service to become unstable.

For debugging concurrency, I look for symptoms rather than only stack traces. CPU spikes can indicate too much parallelism. High thread counts can indicate blocked I/O or an undersized dependency pool. Lock contention can appear as threads waiting for monitors. Queue growth can reveal that producers are faster than consumers. Thread dumps are especially useful because they show what workers are actually doing at the moment of failure.

My mental model is therefore: protect shared state, choose an execution policy, coordinate only where necessary, bound resources, and make overload behaviour explicit. Once those principles are clear, synchronized, ReentrantLock, AtomicInteger, ExecutorService, CompletableFuture and concurrent collections become tools for specific problems instead of a list of APIs to memorise.`,
    category: 'Java',
    tags: ['Java', 'Concurrency', 'Performance'],
    publishedAt: '2026-08-16',
    readingTime: '10 min read',
    status: 'published'
  },
];

export function getPublishedPosts() {
  return demoPosts.filter((post) => post.status === 'published').sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getPostsByTag(slug: string) {
  return getPublishedPosts().filter((post) => post.tags.some((tag) => slugify(tag) === slug));
}

export function getPostsByCategory(slug: string) {
  return getPublishedPosts().filter((post) => slugify(post.category) === slug);
}

export function getAllTags() {
  return [...new Set(getPublishedPosts().flatMap((post) => post.tags))].sort();
}

export function getAllCategories() {
  return [...new Set(getPublishedPosts().map((post) => post.category))].sort();
}
