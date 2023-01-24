import {
    HealthGroup,
    MedicalHealth,
    MedicalHealthOption,
    MedicalHealthRecommendation,
    PhysicalHealth,
    PhysicalHealthRecommendation,
    SocialHealth,
    SocialHealthIndicator,
    SocialHealthRecommendation,
    Student,
    Class,
    PedagogueHealthOption,
    PedagogueHealthSuboption
} from '@prisma/client'

declare global {
    type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
    type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

    type HealthComponentData =
        | (Student & {
              class: Class | null
              physicalHealth: {
                  healthGroup: HealthGroup | null
                  recommendations: PhysicalHealthRecommendation[]
                  specialistNotes: string | null
              } | null
              medicalHealth: {
                  options: MedicalHealthOption[]
                  recommendations: MedicalHealthRecommendation[]
                  specialistNotes: string | null
              } | null
              socialHealth: {
                  indicators: SocialHealthIndicator[]
                  recommendations: SocialHealthRecommendation[]
              } | null
              pedagogueHealth: {
                  options: PedagogueHealthOption[]
              } | null
              psychologicalHealth: {
                  options: PsychologicalHealthOption[]
              } | null
          })
        | null
}
