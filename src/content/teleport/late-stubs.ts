import type { SceneDef } from '../schema'

/**
 * TELEPORT — engine ladders (shared by every act): insolvency and burnout.
 * First trigger opens the authored scene; a second trigger ends the chapter.
 */
export const LATE_STUBS: readonly SceneDef[] = [
  {
    id: 't_insolvency',
    ambience: 'night',
    art: 'world_t_runway_zero',
    landmark: true,
    title: 'RUNWAY ZERO',
    leadIn:
      'Space companies do not die differently from garage companies. The account turns the same color; the silence in the inbox is the same silence. The only change is the number of zeros on the way down.',
    prose:
      'Payroll bounces at a company with hardware around the Moon. The constellation keeps flying — orbital mechanics does not read the news — but everything on the ground goes brittle at once: the insurer wants a call, the landlord wants a call, and the people who moved their families to the Cape for you want, deserve, more than a call. Doors remain, even now. They are all ugly, and they are all real.',
    choices: [
      {
        label: 'Bridge loan against the constellation itself',
        requires: { k: 'not', p: { k: 'flag', scope: 'company', key: 'bridge_used', cmp: 'eq', v: true } },
        effects: [
          { e: 'treasury', d: 500000 },
          { e: 'stress', d: 12 },
          { e: 'flag', scope: 'company', key: 'bridge_used', v: true },
        ],
        result:
          'Signed at midnight against the relays, the bodies, the patents — the collateral schedule reads like an inventory of your life. The lender’s engineer asks, during diligence, how one repossesses a satellite. Nobody laughs.',
      },
      {
        label: 'Down round — June doubles down on you',
        requires: {
          k: 'all',
          of: [
            { k: 'met', who: 'june' },
            { k: 'not', p: { k: 'flag', scope: 'company', key: 'down_used', cmp: 'eq', v: true } },
          ],
        },
        effects: [
          { e: 'treasury', d: 900000 },
          { e: 'stake', who: 'june', d: 8 },
          { e: 'rel', who: 'june', resp: 2 },
          { e: 'stress', d: 10 },
          { e: 'flag', scope: 'company', key: 'down_used', v: true },
        ],
        result:
          'The round that was supposed to arrive died on somebody’s dashboard. You call June to inform her, not to ask — and she does the June Park thing, the thing she has done across two companies now: “Then I’m in for my share anyway.” It costs real ownership and a price that stings. She wires it before the call ends, and neither of you ever, once, calls it charity.',
      },
      {
        label: 'HALCYON’s acqui-hire: the team survives, the road doesn’t',
        effects: [{ e: 'end', ending: 'swallowed' }],
        result:
          'The monopoly takes the engineers, the patents, and the constellation, at the distressed price its model has been patiently forecasting since the week it met you. The road around the sky becomes a lane inside it.',
      },
      {
        label: 'Surrender',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result: 'Some machines are worth more than their company was allowed to be.',
      },
    ],
  },
  {
    id: 't_burnout',
    ambience: 'night',
    art: 'world_t_burnout',
    landmark: true,
    title: 'THE BODY KEEPS SCORE',
    leadIn:
      'It has a sound, apparently, the moment a founder’s body files its own motion — in your case a waiting room at 4 a.m., a blood pressure cuff, and a doctor reading your intake form with visible professional alarm.',
    prose:
      'The diagnosis is not dramatic, which the doctor says is the last undramatic thing about it: this is the exit ramp before the dramatic ones. You run a company that lets people stand on the Moon without leaving Earth, and you have not left the building, in any sense that matters, in two years. The machine in the corner of the teleop bay gets scheduled maintenance. The founder does not. The founder is now being told, by someone with a clipboard, that the maintenance is no longer optional.',
    choices: [
      {
        label: 'Take the forced rest. Three real weeks.',
        effects: [
          { e: 'stress', d: -45 },
          { e: 'treasury', d: -30000 },
        ],
        result:
          'Three weeks of handed-off decisions and phone-free mornings. The company survives you resting, which is the finding that rearranges you more than the bloodwork: it can breathe without you. That fact will matter again someday, in a room with very good chairs.',
      },
      {
        label: 'White-knuckle it. Decline the diagnosis.',
        effects: [
          { e: 'stress', d: -12 },
          { e: 'rep', d: -1 },
        ],
        result:
          'You negotiate with your own body like it is a vendor, and it extends terms, once, the way vendors do — with interest, and a note in the file. Nothing left in the tank next time. The doctor’s exact words, written where you will find them again.',
      },
      {
        label: 'Walk away. Let it all end here.',
        effects: [{ e: 'end', ending: 'bankrupt' }],
        result:
          'There is a version of health that costs a company. You pay it. The wind-down is orderly because June — or whoever is left holding the spreadsheet — makes it orderly, and the last thing shipped is everyone’s final paycheck, on time.',
      },
    ],
  },
]
