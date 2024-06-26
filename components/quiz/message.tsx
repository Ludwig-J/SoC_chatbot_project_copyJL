'use client'

import { IconSoCcoach, IconUser } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { spinner } from './spinner'
import { CodeBlock } from '../ui/codeblock'
import { MemoizedReactMarkdown } from '../markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative flex flex-row-reverse items-start text-right md:mr-[-60px] ">
      <div className="hidden md:flex size-[60px] shrink-0 select-none items-center justify-center rounded-md border bg-background shadow-sm ">
        <IconUser />
      </div>
      <div className="ml-7 space-y-2 overflow-hidden p-5 rounded-3xl text-justify mr-2 min-h-[60px] text-white bg-SoCblue dark:bg-cyan-800">
        {children}
      </div>
    </div>
  )
}

export function BotMessage({
  content,
  className
}: {
  content: string | StreamableValue<string>
  className?: string
}) {
  const text = useStreamableText(content)

  return (
    <div
      className={cn('group relative flex items-start md:-ml-10 my-5', className)}
    >
      <div className="hidden md:flex size-[60px] shrink-0 select-none items-center justify-center rounded-md border bg-background text-primary-foreground shadow-sm">
        <IconSoCcoach />
      </div>
      <div className=" flex-1 space-y-2 overflow-hidden px-2">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 bg-SoCbrain dark:bg-slate-800 rounded-3xl p-5 text-justify"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}

export function BotCard({
  children,
  showAvatar = true
}: {
  children: React.ReactNode
  showAvatar?: boolean
}) {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div
        className={cn(
          'hidden md:flex size-[60px] shrink-0 select-none items-center justify-center rounded-md border bg-background text-primary-foreground shadow-sm',
          !showAvatar && 'invisible'
        )}
      >
        <IconSoCcoach />
      </div>
      <div className="ml-4 flex-1 pl-2">{children}</div>
    </div>
  )
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial p-2'}>{children}</div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="hidden md:flex size-[60px] shrink-0 select-none items-center justify-center rounded-md border bg-background text-primary-foreground shadow-sm">
        <IconSoCcoach />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  )
}
