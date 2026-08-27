import type { SceneDef } from '../schema'

/**
 * TELEPORT — the survival register. Desperation scenes gated behind low
 * runway; prosperous runs never see them. Space-scale versions of the
 * fifteen-dollar weeks — drawn from the same well.
 */
export const SURVIVAL: readonly SceneDef[] = [
  {
    id: 't_s_farrokh_loan',
    mood: 'dread',
    ambience: 'night',
    place: 'TELEPORT HQ',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 8 },
        { k: 'met', who: 'farrokh' },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'farrokh_gone', cmp: 'eq', v: true } },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'farrokh_lent', cmp: 'eq', v: true } },
      ],
    },
    weight: 2,
    art: 'world_farrokh_loan',
    title: 'HIS OTHER ACCOUNT',
    speaker: 'farrokh',
    leadIn:
      'The runway math has reached the point where everyone can do it in their heads, then quietly stops saying it out loud. Omid asks for five minutes after standup and shuts the door.',
    prose:
      'He puts a personal check on the desk, already signed, amount blank. “My consulting years,” he says. “The money nobody would let me spend on the cascade. Sixty thousand — it’s what there is.” You start to object, and he holds up one hand. “I am being accurate. If this company dies, my life’s work goes back in the cardboard box, and I have done the box. Nine years of the box.” He slides the check an inch closer. “Partners fund the gap. That was the deal even when we didn’t write it down.”',
    choices: [
      {
        label: 'Take it as a loan, papered, with interest.',
        foley: 'pen',
        effects: [
          { e: 'treasury', d: 60000 },
          { e: 'flag', scope: 'company', key: 'farrokh_lent', v: true },
          { e: 'rel', who: 'farrokh', aff: 2, resp: 1 },
          { e: 'stress', d: 3 },
        ],
        result:
          'Tomás writes it up properly at cost — a real note, real interest, real dignity. Money between partners gets written down before it turns poisonous. You both know which kind you want, and sign accordingly.',
      },
      {
        label: 'Refuse it. Partners don’t eat each other’s savings.',
        effects: [
          { e: 'rel', who: 'farrokh', resp: 2 },
          { e: 'stress', d: 4 },
          { e: 'flag', scope: 'company', key: 'farrokh_lent', v: true },
        ],
        result:
          'He takes the check back without argument, tears it once, and puts the halves in his shirt pocket. “Then find the money,” he says, “because I don’t know how to do the box again.” It is the closest he has ever come to asking you for anything.',
      },
    ],
  },
  {
    id: 't_s_pawn_body',
    mood: 'dread',
    ambience: 'hangar',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 6 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'body_pawned', cmp: 'eq', v: true } },
        { k: 'seen', scene: 't_expo_demo' },
      ],
    },
    weight: 2,
    art: 'world_pawn_body',
    title: 'THE MUSEUM PIECE',
    leadIn:
      'The collector’s email has been flagged for a month. He is a rich space-history type who “acquires artifacts of the presence era.” You know what he wants. It is standing in the corner of the hangar, cabled to a rack, retired.',
    prose:
      'Demo Body One waits under a dust sheet by the far wall — the expo machine, the one the crowd counted out loud for, the one whose wrist motor you replaced in a hotel bathroom with a borrowed tool. It has sat idle for a year, because the newer bodies turned it into a museum piece. Now a collector is offering ninety thousand dollars in cash, and payroll is due in nineteen days. It turns out monuments can be sold by the pound too.',
    choices: [
      {
        label: 'Sell it. Machines work for the company, even this way.',
        effects: [
          { e: 'treasury', d: 90000 },
          { e: 'flag', scope: 'company', key: 'body_pawned', v: true },
          { e: 'stress', d: 4 },
        ],
        result:
          'The crate — the same casket-sized crate — gets loaded by people who have no idea what they are carrying. In the collector’s lobby it will stand under track lighting with a plaque that gets the date wrong. Payroll clears. The corner of the hangar stays empty for months because nobody can decide what deserves the spot.',
      },
      {
        label: 'Keep it. Find the payroll money somewhere else.',
        effects: [
          { e: 'flag', scope: 'company', key: 'body_pawned', v: true },
          { e: 'stress', d: 3 },
          { e: 'score', d: 1 },
        ],
        result:
          'You write the refusal in one line, then walk to the corner of the hangar and stand a while with the machine that started everything. Money keeps a company alive. This is one of the things that tells it where to go. Nineteen days is nineteen days.',
      },
    ],
  },
  {
    id: 't_s_halcyon_consult',
    mood: 'dread',
    ambience: 'corp',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 8 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'consulted_enemy', cmp: 'eq', v: true } },
        { k: 'age', cmp: 'gte', v: 60 },
      ],
    },
    weight: 2,
    art: 'world_consult_enemy',
    title: 'TEACHING THE ANACONDA',
    speaker: 'halcyon',
    leadIn:
      'The message from HALCYON’s partnership system is so bland it becomes threatening: a six-week paid job where your operations team trains theirs on “remote robot best practices.”',
    prose:
      'One hundred and fifty thousand dollars for six weeks of teaching the launch monopoly how remote Moon work actually runs — the checklists, the handover drills, how you pick an operator. Everyone in the room understands what HALCYON is really buying. Their secret robot lab has spent a year trying to copy your operation and failing, and the model has decided lessons are cheaper than more failures. The spreadsheet adds one fact with no opinion attached: the fee equals one payroll, and it arrives one payroll before you run out.',
    choices: [
      {
        label: 'Take the engagement. Teach carefully.',
        effects: [
          { e: 'treasury', d: 150000 },
          { e: 'flag', scope: 'company', key: 'consulted_enemy', v: true },
          { e: 'rel', who: 'halcyon', aff: 1 },
          { e: 'rep', d: -1 },
          { e: 'stress', d: 3 },
        ],
        result:
          'Six weeks of teaching the anaconda table manners. Your team is careful about what stays secret, and the checks clear. The industry notices anyway. The trade press runs a paragraph with the word “capitulation” hiding between the lines. Payroll does not care about subtext.',
      },
      {
        label: 'Decline. You don’t school the thing hunting you.',
        effects: [
          { e: 'flag', scope: 'company', key: 'consulted_enemy', v: true },
          { e: 'stress', d: 4 },
          { e: 'score', d: 1 },
        ],
        result:
          'The refusal costs a payroll cycle’s worth of sleep and buys something with no line item. Everyone at the company knows, now, that there is a number the founders won’t take. That knowledge shows up to work differently the next morning.',
      },
    ],
  },
  {
    id: 't_s_ramen',
    mood: 'dread',
    ambience: 'hangar',
    when: {
      k: 'all',
      of: [
        { k: 'runway', cmp: 'lt', v: 5 },
        { k: 'not', p: { k: 'flag', scope: 'company', key: 'great_cut', cmp: 'eq', v: true } },
      ],
    },
    weight: 2,
    art: 'world_great_cut',
    title: 'THE LIST',
    leadIn:
      'The spending spreadsheet becomes the first thing you see every morning and the last thing you see at night, like a newborn that only screams. Somebody has to make the list of cuts. The list is yours to make.',
    prose:
      'Every line on the cut list has a face: the second operator shift, the Mars bench if it still burns, the conference budget, the good coffee, the contractor who fixed the roof and stayed because he believed in the thing. The math is brutal — cut deep enough to survive, but shallow enough that a company worth saving still exists afterward. Founders before you have made this list at kitchen tables, in garages, and in hangars exactly like this one, and every one of them will tell you the same two facts: it works, and you never stop remembering the faces.',
    choices: [
      {
        label: 'Cut deep. Live long enough to be sorry.',
        effects: [
          { e: 'burn', d: -8000 },
          { e: 'flag', scope: 'company', key: 'great_cut', v: true },
          { e: 'stress', d: 8 },
          { e: 'rep', d: -1 },
        ],
        result:
          'Eleven people, one bench, most of the softness. You tell each of them yourself, face to face. It fixes nothing and matters anyway. The building is quieter afterward in a way that has nothing to do with headcount.',
      },
      {
        label: 'Cut shallow. Bet the next deal closes in time.',
        effects: [
          { e: 'burn', d: -3000 },
          { e: 'flag', scope: 'company', key: 'great_cut', v: true },
          { e: 'stress', d: 5 },
        ],
        result:
          'The gentler list cuts the budget lines with no faces, the vendor contracts, your own salary to a dollar. It buys fewer weeks. It keeps the machine whole for the future you are still, against the spreadsheet’s advice, expecting.',
      },
    ],
  },
]
