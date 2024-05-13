import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'
import Image from 'next/image'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8 items-center">
        <h1 className="text-lg font-semibold">
          Welcome to the School of Code AI Chatbot!
        </h1>
        <div className="flex flex-row">
          <Image src="/cat.png" alt="cat logo" width={75} height={75} />
          <Image src="/chris.png" alt="chris logo" width={75} height={75} />
          <Image src="/soc_logo.png" alt="SoC logo" width={75} height={75} />
          <Image src="/loz.png" alt="loz logo" width={75} height={75} />
          <Image src="/tom.png" alt="tom logo" width={75} height={75} />
        </div>
        <p className="leading-normal text-muted-foreground">
          Your guide, your mentor, your learning companion; a transformative
          experience that goes beyond your regular chatbots. With insights,
          resources, and quizzes, it propels learners forward. Say farewell to
          shallow interactions. Our CoachBot: the catalyst for learning
          excellence.
        </p>
      </div>
    </div>
  )
}
