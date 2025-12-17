export default function BadgeExplainer() {
  return (
    <div className="max-w-5xl mx-auto mb-8">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Monopoly Badge */}
        <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/50">
              AI MONOPOLY
            </span>
          </div>
          <h4 className="text-white font-bold mb-2">Monopoly</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Companies with <strong>dominant market share</strong> (typically &gt;40%) in AI computing, data, or talent. 
            These firms control critical infrastructure and set industry standards, often limiting competition and innovation.
            <span className="block mt-2 text-red-400 font-semibold">
              ⚠️ High concentration risk
            </span>
          </p>
        </div>

        {/* Challenger Badge */}
        <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/50">
              CHALLENGER
            </span>
          </div>
          <h4 className="text-white font-bold mb-2">Challenger</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Companies competing in the same AI markets but with <strong>smaller market share</strong>. 
            While they bring innovation and competition, many challengers are also <strong>pursuing monopolistic strategies</strong> and may become tomorrow's monopolies.
            <span className="block mt-2 text-yellow-400 font-semibold">
              ⚡ Monitor their growth carefully
            </span>
          </p>
        </div>

        {/* Private Badge */}
        <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-bold border border-purple-500/50">
              PRIVATE
            </span>
          </div>
          <h4 className="text-white font-bold mb-2">Private</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            Companies <strong>not publicly traded</strong> on stock exchanges (e.g., OpenAI, Anthropic). 
            You cannot buy their shares directly, but you can support their <strong>publicly-traded competitors</strong> or partners to influence the market.
            <span className="block mt-2 text-purple-400 font-semibold">
              🔒 No direct stock purchase
            </span>
          </p>
        </div>
      </div>

      <div className="mt-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 text-sm">
          <strong className="text-blue-400">💡 Investment Strategy:</strong> When you "Disapprove" a monopoly or challenger, 
          we buy shares of <strong>non-monopolistic alternatives</strong> in different sectors or smaller competitors that prioritize 
          transparency and ethical AI practices.
        </p>
      </div>
    </div>
  );
}
