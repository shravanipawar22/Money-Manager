"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import {
  PiggyBank,
  ShoppingCart,
  Home,
  Plus,
  Trash2,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calculator,
  Target,
  Wallet,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Expense {
  id: string
  category: "needs" | "wants" | "savings"
  description: string
  amount: number
  date: string
}

export default function MoneyManager() {
  const [income, setIncome] = useState<number>(0)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [newExpense, setNewExpense] = useState({
    category: "needs" as "needs" | "wants" | "savings",
    description: "",
    amount: 0,
  })

  // Add salary-based advice function
  const getSalaryCategory = (income: number) => {
    if (income < 30000) return "entry"
    if (income < 100000) return "middle"
    return "high"
  }

  const getSalaryAdvice = (income: number) => {
    const category = getSalaryCategory(income)

    switch (category) {
      case "entry":
        return {
          title: "Entry Level Salary (Below Rs 30,000)",
          advice: "Focus on building basic financial habits and emergency fund",
          needsTips: [
            "• Prioritize essential expenses - rent, food, transport",
            "• Look for shared accommodation to reduce rent",
            "• Cook at home more often to save on food costs",
            "• Use public transport or bike instead of cab services",
          ],
          wantsTips: [
            "• Limit entertainment budget to Rs 2,000-3,000",
            "• Choose free entertainment like parks, libraries",
            "• Avoid expensive gadgets and branded items",
            "• Use student discounts and offers wherever possible",
          ],
          savingsTips: [
            "• Start with Rs 500-1000 monthly savings",
            "• Build emergency fund of Rs 50,000-75,000",
            "• Open a basic savings account with zero balance",
            "• Consider small SIP of Rs 500-1000 in index funds",
          ],
        }
      case "middle":
        return {
          title: "Middle Class Salary (Rs 30,000 - Rs 1,00,000)",
          advice: "Balance your lifestyle while building wealth systematically",
          needsTips: [
            "• Optimize rent to 25-30% of income maximum",
            "• Get health insurance for family protection",
            "• Plan grocery shopping with monthly budget",
            "• Consider term life insurance for dependents",
          ],
          wantsTips: [
            "• Allocate Rs 5,000-15,000 for lifestyle expenses",
            "• Plan one vacation per year within budget",
            "• Invest in skill development courses",
            "• Balance dining out with home cooking",
          ],
          savingsTips: [
            "• Build emergency fund of 6-8 months expenses",
            "• Start SIP of Rs 3,000-10,000 in diversified funds",
            "• Invest in PPF for tax saving (Rs 1.5 lakh limit)",
            "• Consider ELSS funds for tax benefits",
          ],
        }
      case "high":
        return {
          title: "High Income Salary (Above Rs 1,00,000)",
          advice: "Focus on wealth creation and advanced tax planning",
          needsTips: [
            "• Keep needs under 40% to maximize savings",
            "• Get comprehensive health and life insurance",
            "• Consider premium housing in good locations",
            "• Invest in quality over quantity for essentials",
          ],
          wantsTips: [
            "• Enjoy lifestyle but avoid lifestyle inflation",
            "• Plan international travel and premium experiences",
            "• Invest in hobbies and personal development",
            "• Consider premium subscriptions and services",
          ],
          savingsTips: [
            "• Target 30-40% savings rate for wealth building",
            "• Diversify across equity, debt, real estate",
            "• Max out PPF, ELSS, and other tax-saving options",
            "• Consider direct equity and advanced investments",
          ],
        }
      default:
        return null
    }
  }

  // Calculate budget breakdown
  const needsBudget = income * 0.5
  const wantsBudget = income * 0.3
  const savingsBudget = income * 0.2

  // Calculate spent amounts
  const needsSpent = expenses.filter((e) => e.category === "needs").reduce((sum, e) => sum + e.amount, 0)
  const wantsSpent = expenses.filter((e) => e.category === "wants").reduce((sum, e) => sum + e.amount, 0)
  const savingsSpent = expenses.filter((e) => e.category === "savings").reduce((sum, e) => sum + e.amount, 0)

  // Calculate remaining amounts
  const needsRemaining = needsBudget - needsSpent
  const wantsRemaining = wantsBudget - wantsSpent
  const savingsRemaining = savingsBudget - savingsSpent

  const pieData = [
    { name: "Needs (50%)", value: needsBudget, color: "#ef4444" },
    { name: "Wants (30%)", value: wantsBudget, color: "#f59e0b" },
    { name: "Savings (20%)", value: savingsBudget, color: "#10b981" },
  ]

  const spendingData = [
    { category: "Needs", budget: needsBudget, spent: needsSpent, remaining: needsRemaining },
    { category: "Wants", budget: wantsBudget, spent: wantsSpent, remaining: wantsRemaining },
    { category: "Savings", budget: savingsBudget, spent: savingsSpent, remaining: savingsRemaining },
  ]

  const addExpense = () => {
    if (newExpense.description && newExpense.amount > 0) {
      const expense: Expense = {
        id: Date.now().toString(),
        ...newExpense,
        date: new Date().toISOString().split("T")[0],
      }
      setExpenses([...expenses, expense])
      setNewExpense({ category: "needs", description: "", amount: 0 })
    }
  }

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-8">
        {/* Mobile-Optimized Header */}
        <div className="text-center space-y-4 sm:space-y-6 py-6 sm:py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4 sm:mb-6">
            <Wallet className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent px-4">
            Smart Money Manager
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Master your finances with the proven 50-30-20 rule. Professional financial planning tool designed for Indian
            families and professionals to build lasting wealth.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-blue-600 bg-blue-50 px-3 py-2 sm:px-4 rounded-full w-fit mx-auto">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
            Trusted by 10,000+ users across India
          </div>
        </div>

        {/* Mobile-Optimized Income Input */}
        <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mb-4 mx-auto">
              <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Monthly Income</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 px-2">
              Enter your total monthly income to get personalized financial insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="income" className="text-sm font-semibold text-gray-700">
                Income Amount (Rs)
              </Label>
              <div className="relative">
                <Input
                  id="income"
                  type="number"
                  placeholder="50,000"
                  value={income || ""}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="text-base sm:text-lg font-semibold pl-10 sm:pl-12 h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                />
                <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  ₹
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {income > 0 && (
          <>
            {/* Mobile-Optimized 50-30-20 Rule Explanation */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center pb-4 sm:pb-6">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-4 mx-auto">
                  <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900">The 50-30-20 Rule</CardTitle>
                <CardDescription className="text-base sm:text-lg text-gray-600 px-2">
                  Professional budgeting framework for optimal financial management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="group hover:scale-105 transition-transform duration-300">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl border border-red-100 shadow-lg">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl mb-4 shadow-lg">
                        <Home className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-2">50% - Needs</h3>
                      <p className="text-xs sm:text-sm text-red-600 mb-4 leading-relaxed">
                        Essential expenses like rent, groceries, utilities, EMIs, insurance
                      </p>
                      <div className="text-xl sm:text-2xl font-bold text-red-700 bg-white/50 rounded-lg py-2">
                        ₹{needsBudget.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="group hover:scale-105 transition-transform duration-300">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl border border-amber-100 shadow-lg">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl mb-4 shadow-lg">
                        <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-700 mb-2">30% - Wants</h3>
                      <p className="text-xs sm:text-sm text-amber-600 mb-4 leading-relaxed">
                        Entertainment, dining out, shopping, movies, travel
                      </p>
                      <div className="text-xl sm:text-2xl font-bold text-amber-700 bg-white/50 rounded-lg py-2">
                        ₹{wantsBudget.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  <div className="group hover:scale-105 transition-transform duration-300">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl border border-emerald-100 shadow-lg">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                        <PiggyBank className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-700 mb-2">20% - Savings</h3>
                      <p className="text-xs sm:text-sm text-emerald-600 mb-4 leading-relaxed">
                        Emergency fund, SIP, PPF, FD, insurance premiums
                      </p>
                      <div className="text-xl sm:text-2xl font-bold text-emerald-700 bg-white/50 rounded-lg py-2">
                        ₹{savingsBudget.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile-Optimized Detailed Computations */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                      Detailed Budget Analysis
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600">
                      Professional breakdown of your ₹{income.toLocaleString("en-IN")} monthly income
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 sm:space-y-8">
                  {/* Mobile-Optimized Basic Calculations */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100 shadow-md">
                      <h4 className="font-bold text-red-700 mb-4 text-base sm:text-lg flex items-center gap-2">
                        <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                        Needs Calculation
                      </h4>
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Income:</span>
                          <span className="font-semibold">₹{income.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Needs Percentage:</span>
                          <span className="font-semibold">50%</span>
                        </div>
                        <div className="border-t border-red-200 pt-3 font-bold text-red-700">
                          ₹{income.toLocaleString("en-IN")} × 50% = ₹{needsBudget.toLocaleString("en-IN")}
                        </div>
                        <div className="bg-white/70 rounded-lg p-3 text-xs text-red-600">
                          <div>Daily Budget: ₹{(needsBudget / 30).toFixed(0)}</div>
                          <div>Weekly Budget: ₹{(needsBudget / 4).toFixed(0)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border border-amber-100 shadow-md">
                      <h4 className="font-bold text-amber-700 mb-4 text-base sm:text-lg flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                        Wants Calculation
                      </h4>
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Income:</span>
                          <span className="font-semibold">₹{income.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Wants Percentage:</span>
                          <span className="font-semibold">30%</span>
                        </div>
                        <div className="border-t border-amber-200 pt-3 font-bold text-amber-700">
                          ₹{income.toLocaleString("en-IN")} × 30% = ₹{wantsBudget.toLocaleString("en-IN")}
                        </div>
                        <div className="bg-white/70 rounded-lg p-3 text-xs text-amber-600">
                          <div>Weekly Budget: ₹{(wantsBudget / 4).toFixed(0)}</div>
                          <div>Weekend Budget: ₹{(wantsBudget / 8).toFixed(0)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-100 shadow-md">
                      <h4 className="font-bold text-emerald-700 mb-4 text-base sm:text-lg flex items-center gap-2">
                        <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5" />
                        Savings Calculation
                      </h4>
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Income:</span>
                          <span className="font-semibold">₹{income.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Savings Percentage:</span>
                          <span className="font-semibold">20%</span>
                        </div>
                        <div className="border-t border-emerald-200 pt-3 font-bold text-emerald-700">
                          ₹{income.toLocaleString("en-IN")} × 20% = ₹{savingsBudget.toLocaleString("en-IN")}
                        </div>
                        <div className="bg-white/70 rounded-lg p-3 text-xs text-emerald-600">
                          <div>Yearly Savings: ₹{(savingsBudget * 12).toLocaleString("en-IN")}</div>
                          <div>10-Year Goal: ₹{(savingsBudget * 12 * 10).toLocaleString("en-IN")}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-Optimized Detailed Breakdown by Salary Category */}
                  {(() => {
                    const salaryAdvice = getSalaryAdvice(income)
                    const category = getSalaryCategory(income)

                    return (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{salaryAdvice.title}</h4>
                          <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-2 sm:px-4 rounded-full text-blue-700 font-semibold text-sm sm:text-base">
                            {salaryAdvice.advice}
                          </div>
                        </div>

                        {/* Mobile-Optimized Needs Breakdown */}
                        <div className="p-4 sm:p-6 border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl shadow-lg">
                          <h5 className="font-bold text-red-700 mb-4 text-lg sm:text-xl flex items-center gap-3">
                            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
                            Needs Budget: ₹{needsBudget.toLocaleString("en-IN")} (50%)
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                            {category === "entry" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Rent/PG: ₹{(needsBudget * 0.4).toFixed(0)} (40% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Food & Groceries: ₹{(needsBudget * 0.3).toFixed(0)} (30% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Transportation: ₹{(needsBudget * 0.15).toFixed(0)} (15% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Utilities & Phone: ₹{(needsBudget * 0.1).toFixed(0)} (10% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg sm:col-span-2">
                                  • Basic Insurance: ₹{(needsBudget * 0.05).toFixed(0)} (5% of needs)
                                </div>
                              </>
                            )}
                            {category === "middle" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Rent/EMI: ₹{(needsBudget * 0.35).toFixed(0)} (35% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Food & Groceries: ₹{(needsBudget * 0.25).toFixed(0)} (25% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Transportation: ₹{(needsBudget * 0.15).toFixed(0)} (15% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Utilities & Bills: ₹{(needsBudget * 0.1).toFixed(0)} (10% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Insurance Premiums: ₹{(needsBudget * 0.1).toFixed(0)} (10% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Loan EMIs: ₹{(needsBudget * 0.05).toFixed(0)} (5% of needs)
                                </div>
                              </>
                            )}
                            {category === "high" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Housing (Rent/EMI): ₹{(needsBudget * 0.3).toFixed(0)} (30% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Food & Groceries: ₹{(needsBudget * 0.2).toFixed(0)} (20% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Transportation: ₹{(needsBudget * 0.15).toFixed(0)} (15% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Utilities & Services: ₹{(needsBudget * 0.1).toFixed(0)} (10% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Insurance & Protection: ₹{(needsBudget * 0.15).toFixed(0)} (15% of needs)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Loan EMIs: ₹{(needsBudget * 0.1).toFixed(0)} (10% of needs)
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Mobile-Optimized Wants Breakdown */}
                        <div className="p-4 sm:p-6 border-l-4 border-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg">
                          <h5 className="font-bold text-amber-700 mb-4 text-lg sm:text-xl flex items-center gap-3">
                            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                            Wants Budget: ₹{wantsBudget.toLocaleString("en-IN")} (30%)
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                            {category === "entry" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Entertainment: ₹{(wantsBudget * 0.3).toFixed(0)} (30% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Dining Out: ₹{(wantsBudget * 0.25).toFixed(0)} (25% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Shopping: ₹{(wantsBudget * 0.2).toFixed(0)} (20% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Hobbies: ₹{(wantsBudget * 0.15).toFixed(0)} (15% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg sm:col-span-2">
                                  • Miscellaneous: ₹{(wantsBudget * 0.1).toFixed(0)} (10% of wants)
                                </div>
                              </>
                            )}
                            {category === "middle" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Entertainment & Movies: ₹{(wantsBudget * 0.25).toFixed(0)} (25% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Dining & Food Delivery: ₹{(wantsBudget * 0.25).toFixed(0)} (25% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Shopping & Lifestyle: ₹{(wantsBudget * 0.2).toFixed(0)} (20% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Travel & Vacation: ₹{(wantsBudget * 0.15).toFixed(0)} (15% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Hobbies & Courses: ₹{(wantsBudget * 0.1).toFixed(0)} (10% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Gifts & Social: ₹{(wantsBudget * 0.05).toFixed(0)} (5% of wants)
                                </div>
                              </>
                            )}
                            {category === "high" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Premium Entertainment: ₹{(wantsBudget * 0.2).toFixed(0)} (20% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Fine Dining & Experiences: ₹{(wantsBudget * 0.25).toFixed(0)} (25% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Luxury Shopping: ₹{(wantsBudget * 0.2).toFixed(0)} (20% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Travel & Holidays: ₹{(wantsBudget * 0.2).toFixed(0)} (20% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Personal Development: ₹{(wantsBudget * 0.1).toFixed(0)} (10% of wants)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Social & Networking: ₹{(wantsBudget * 0.05).toFixed(0)} (5% of wants)
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Mobile-Optimized Savings Breakdown */}
                        <div className="p-4 sm:p-6 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl shadow-lg">
                          <h5 className="font-bold text-emerald-700 mb-4 text-lg sm:text-xl flex items-center gap-3">
                            <PiggyBank className="h-5 w-5 sm:h-6 sm:w-6" />
                            Savings Plan: ₹{savingsBudget.toLocaleString("en-IN")} (20%)
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                            {category === "entry" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Emergency Fund: ₹{(savingsBudget * 0.4).toFixed(0)} (40% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • SIP in Index Funds: ₹{(savingsBudget * 0.3).toFixed(0)} (30% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Fixed Deposit: ₹{(savingsBudget * 0.2).toFixed(0)} (20% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Skill Development: ₹{(savingsBudget * 0.1).toFixed(0)} (10% of savings)
                                </div>
                                <div className="col-span-1 sm:col-span-2 mt-2 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl text-xs">
                                  <strong className="text-emerald-700">10-Year Projection:</strong> ₹
                                  {(savingsBudget * 12 * 10 + savingsBudget * 12 * 10 * 0.12).toLocaleString("en-IN")}{" "}
                                  (assuming 12% returns)
                                </div>
                              </>
                            )}
                            {category === "middle" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Emergency Fund: ₹{(savingsBudget * 0.3).toFixed(0)} (30% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Equity SIP: ₹{(savingsBudget * 0.4).toFixed(0)} (40% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • PPF Contribution: ₹{(savingsBudget * 0.15).toFixed(0)} (15% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • ELSS (Tax Saving): ₹{(savingsBudget * 0.1).toFixed(0)} (10% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Gold/Debt Funds: ₹{(savingsBudget * 0.05).toFixed(0)} (5% of savings)
                                </div>
                                <div className="col-span-1 sm:col-span-2 mt-2 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl text-xs">
                                  <strong className="text-emerald-700">Wealth Projection (15 years):</strong> ₹
                                  {(savingsBudget * 12 * 15 + savingsBudget * 12 * 15 * 0.15).toLocaleString("en-IN")}{" "}
                                  (assuming 15% equity returns)
                                </div>
                              </>
                            )}
                            {category === "high" && (
                              <>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Emergency Fund: ₹{(savingsBudget * 0.2).toFixed(0)} (20% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Equity Investments: ₹{(savingsBudget * 0.4).toFixed(0)} (40% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Real Estate Fund: ₹{(savingsBudget * 0.15).toFixed(0)} (15% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • PPF + ELSS: ₹{(savingsBudget * 0.1).toFixed(0)} (10% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • International Funds: ₹{(savingsBudget * 0.1).toFixed(0)} (10% of savings)
                                </div>
                                <div className="bg-white/70 p-3 rounded-lg">
                                  • Alternative Investments: ₹{(savingsBudget * 0.05).toFixed(0)} (5% of savings)
                                </div>
                                <div className="col-span-1 sm:col-span-2 mt-2 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl text-xs">
                                  <strong className="text-emerald-700">Wealth Target (20 years):</strong> ₹
                                  {(savingsBudget * 12 * 20 + savingsBudget * 12 * 20 * 0.18).toLocaleString("en-IN")}{" "}
                                  (diversified portfolio returns)
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Mobile-Optimized Financial Milestones */}
                        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-lg">
                          <h5 className="font-bold text-blue-700 mb-4 text-lg sm:text-xl flex items-center gap-3">
                            <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                            Financial Milestones & Timeline
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            <div className="text-center p-4 bg-white/70 rounded-xl">
                              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">6 Months</div>
                              <div className="text-xs sm:text-sm text-gray-600">Emergency Fund</div>
                              <div className="text-base sm:text-lg font-semibold text-blue-700">
                                ₹{(savingsBudget * 6 * 0.4).toLocaleString("en-IN")}
                              </div>
                            </div>
                            <div className="text-center p-4 bg-white/70 rounded-xl">
                              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">1 Year</div>
                              <div className="text-xs sm:text-sm text-gray-600">Total Savings</div>
                              <div className="text-base sm:text-lg font-semibold text-blue-700">
                                ₹{(savingsBudget * 12).toLocaleString("en-IN")}
                              </div>
                            </div>
                            <div className="text-center p-4 bg-white/70 rounded-xl">
                              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-2">5 Years</div>
                              <div className="text-xs sm:text-sm text-gray-600">Wealth Target</div>
                              <div className="text-base sm:text-lg font-semibold text-blue-700">
                                ₹{(savingsBudget * 12 * 5 * 1.5).toLocaleString("en-IN")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </CardContent>
            </Card>

            {/* Mobile-Optimized Budget Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Budget Breakdown</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Visual representation of your 50-30-20 budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="#fff"
                        strokeWidth={2}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Spending vs Budget</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Track your actual spending against your budget
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={spendingData} barGap={10}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip
                        formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                          fontSize: "12px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="budget" fill="#e5e7eb" name="Budget" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="spent" fill="#3b82f6" name="Spent" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Mobile-Optimized Expense Tracking */}
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <Tabs defaultValue="track" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="track"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                  >
                    Track Expenses
                  </TabsTrigger>
                  <TabsTrigger
                    value="overview"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm"
                  >
                    Overview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="track" className="space-y-4 sm:space-y-6 mt-6">
                  <Card className="border border-gray-200 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Add New Expense</CardTitle>
                      <CardDescription className="text-sm">Track your spending in each category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                            Category
                          </Label>
                          <select
                            id="category"
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors text-sm"
                            value={newExpense.category}
                            onChange={(e) =>
                              setNewExpense({
                                ...newExpense,
                                category: e.target.value as "needs" | "wants" | "savings",
                              })
                            }
                          >
                            <option value="needs">Needs (50%)</option>
                            <option value="wants">Wants (30%)</option>
                            <option value="savings">Savings (20%)</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                            Description
                          </Label>
                          <Input
                            id="description"
                            placeholder="Groceries, rent, etc."
                            value={newExpense.description}
                            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors h-12 text-sm"
                          />
                        </div>
                        <div>
                          <Label htmlFor="amount" className="text-sm font-semibold text-gray-700">
                            Amount (₹)
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="1000"
                            value={newExpense.amount || ""}
                            onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                            className="border-2 border-gray-200 focus:border-blue-500 transition-colors h-12 text-sm"
                          />
                        </div>
                        <div className="flex items-end sm:col-span-2 lg:col-span-1">
                          <Button
                            onClick={addExpense}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg text-sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Expense
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mobile-Optimized Recent Expenses */}
                  <Card className="border border-gray-200 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Recent Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        {expenses.length === 0 ? (
                          <div className="text-center py-8 sm:py-12">
                            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full mb-4">
                              <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 text-base sm:text-lg">No expenses added yet</p>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              Start tracking your expenses to see insights
                            </p>
                          </div>
                        ) : (
                          expenses.map((expense) => (
                            <div
                              key={expense.id}
                              className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                <Badge
                                  variant={
                                    expense.category === "needs"
                                      ? "destructive"
                                      : expense.category === "wants"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="px-2 py-1 text-xs shrink-0"
                                >
                                  {expense.category}
                                </Badge>
                                <div className="min-w-0 flex-1">
                                  <span className="font-semibold text-gray-900 text-sm sm:text-base block truncate">
                                    {expense.description}
                                  </span>
                                  <div className="text-xs sm:text-sm text-gray-500">{expense.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                <span className="font-bold text-sm sm:text-lg text-gray-900">
                                  ₹{expense.amount.toLocaleString("en-IN")}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeExpense(expense.id)}
                                  className="hover:bg-red-100 hover:text-red-600 transition-colors p-2"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="overview" className="space-y-4 sm:space-y-6 mt-6">
                  {/* Mobile-Optimized Progress Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg font-bold text-red-700 flex items-center gap-2">
                          <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                          Needs Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs sm:text-sm font-semibold">
                            <span>Spent: ₹{needsSpent.toLocaleString("en-IN")}</span>
                            <span>Budget: ₹{needsBudget.toLocaleString("en-IN")}</span>
                          </div>
                          <Progress value={(needsSpent / needsBudget) * 100} className="h-2 sm:h-3" />
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            {needsRemaining >= 0 ? (
                              <>
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0" />
                                <span className="text-green-600 font-semibold">
                                  ₹{needsRemaining.toLocaleString("en-IN")} remaining
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 shrink-0" />
                                <span className="text-red-600 font-semibold">
                                  ₹{Math.abs(needsRemaining).toLocaleString("en-IN")} over budget
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-yellow-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg font-bold text-amber-700 flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                          Wants Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs sm:text-sm font-semibold">
                            <span>Spent: ₹{wantsSpent.toLocaleString("en-IN")}</span>
                            <span>Budget: ₹{wantsBudget.toLocaleString("en-IN")}</span>
                          </div>
                          <Progress value={(wantsSpent / wantsBudget) * 100} className="h-2 sm:h-3" />
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            {wantsRemaining >= 0 ? (
                              <>
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0" />
                                <span className="text-green-600 font-semibold">
                                  ₹{wantsRemaining.toLocaleString("en-IN")} remaining
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 shrink-0" />
                                <span className="text-red-600 font-semibold">
                                  ₹{Math.abs(wantsRemaining).toLocaleString("en-IN")} over budget
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 sm:col-span-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base sm:text-lg font-bold text-emerald-700 flex items-center gap-2">
                          <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5" />
                          Savings Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs sm:text-sm font-semibold">
                            <span>Saved: ₹{savingsSpent.toLocaleString("en-IN")}</span>
                            <span>Goal: ₹{savingsBudget.toLocaleString("en-IN")}</span>
                          </div>
                          <Progress value={(savingsSpent / savingsBudget) * 100} className="h-2 sm:h-3" />
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            {savingsRemaining >= 0 ? (
                              <>
                                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0" />
                                <span className="text-green-600 font-semibold">
                                  ₹{savingsRemaining.toLocaleString("en-IN")} to reach goal
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0" />
                                <span className="text-green-600 font-semibold">
                                  Goal exceeded by ₹{Math.abs(savingsRemaining).toLocaleString("en-IN")}!
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Mobile-Optimized Financial Health Alerts */}
                  <div className="space-y-4">
                    {needsSpent > needsBudget && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                        <AlertDescription className="text-red-700 text-sm">
                          <strong>Warning:</strong> You've exceeded your needs budget by ₹
                          {(needsSpent - needsBudget).toLocaleString("en-IN")}. Consider reviewing your essential
                          expenses.
                        </AlertDescription>
                      </Alert>
                    )}

                    {wantsSpent > wantsBudget && (
                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                        <AlertDescription className="text-amber-700 text-sm">
                          <strong>Alert:</strong> You've overspent on wants by ₹
                          {(wantsSpent - wantsBudget).toLocaleString("en-IN")}. Try to reduce discretionary spending
                          this month.
                        </AlertDescription>
                      </Alert>
                    )}

                    {savingsSpent >= savingsBudget && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        <AlertDescription className="text-green-700 text-sm">
                          <strong>Great job!</strong> You've reached your savings goal for this month. Keep up the
                          excellent financial discipline!
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Mobile-Optimized Salary-Responsive Tips Section */}
            {(() => {
              const salaryAdvice = getSalaryAdvice(income)
              return (
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                        <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                          {salaryAdvice.title}
                        </CardTitle>
                        <CardDescription className="text-base sm:text-lg text-gray-600">
                          {salaryAdvice.advice}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                      <div className="space-y-4">
                        <h4 className="font-bold text-red-700 text-base sm:text-lg flex items-center gap-3">
                          <Home className="h-4 w-4 sm:h-5 sm:w-5" />
                          Needs (50%) - ₹{needsBudget.toLocaleString("en-IN")}
                        </h4>
                        <div className="space-y-2">
                          {salaryAdvice.needsTips.map((tip, index) => (
                            <div
                              key={index}
                              className="p-3 bg-red-50 rounded-lg text-xs sm:text-sm text-red-700 border border-red-100"
                            >
                              {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-amber-700 text-base sm:text-lg flex items-center gap-3">
                          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                          Wants (30%) - ₹{wantsBudget.toLocaleString("en-IN")}
                        </h4>
                        <div className="space-y-2">
                          {salaryAdvice.wantsTips.map((tip, index) => (
                            <div
                              key={index}
                              className="p-3 bg-amber-50 rounded-lg text-xs sm:text-sm text-amber-700 border border-amber-100"
                            >
                              {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-emerald-700 text-base sm:text-lg flex items-center gap-3">
                          <PiggyBank className="h-4 w-4 sm:h-5 sm:w-5" />
                          Savings (20%) - ₹{savingsBudget.toLocaleString("en-IN")}
                        </h4>
                        <div className="space-y-2">
                          {salaryAdvice.savingsTips.map((tip, index) => (
                            <div
                              key={index}
                              className="p-3 bg-emerald-50 rounded-lg text-xs sm:text-sm text-emerald-700 border border-emerald-100"
                            >
                              {tip}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mobile-Optimized Additional Salary-Specific Recommendations */}
                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                      <h4 className="font-bold text-blue-700 mb-4 text-lg sm:text-xl flex items-center gap-2">
                        <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                        Personalized Recommendations for Your Salary
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {getSalaryCategory(income) === "entry" && (
                          <>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Focus on skill development to increase income
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Avoid credit cards and loans initially
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Track every rupee spent for better awareness
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Look for side income opportunities
                            </div>
                          </>
                        )}
                        {getSalaryCategory(income) === "middle" && (
                          <>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Consider home loan if planning to buy property
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Start investing in child's education fund
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Get adequate health insurance coverage
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Plan for parents' healthcare expenses
                            </div>
                          </>
                        )}
                        {getSalaryCategory(income) === "high" && (
                          <>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Consider real estate investment opportunities
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Plan for early retirement with aggressive savings
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Diversify investments across asset classes
                            </div>
                            <div className="p-3 bg-white/70 rounded-lg text-xs sm:text-sm text-blue-700">
                              • Consider professional financial advisor
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })()}
          </>
        )}

        {/* Mobile-Optimized Footer */}
        <div className="text-center py-8 sm:py-12 space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl mb-4">
            <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 px-4">Start Your Financial Journey Today</h3>
          <p className="text-gray-600 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Take control of your finances with our professional money management tool. Join thousands of Indians who are
            building wealth systematically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 mt-6 sm:mt-8 px-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Expert Recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Indian Market Focused</span>
            </div>
          </div>
          {/* Made by credit */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500">
              Made with ❤️ by <span className="font-semibold text-gray-700">Shravani Pawar</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
