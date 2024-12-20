import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/utils/formatters"

import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod"

const invoiceItemsSchema = z.object({
  name: z.string(),
  quantity: z.number().min(0).max(999).default(0),
  price: z.number().min(0).default(0),
})

export const InvoicesNew = () => {
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    streetAddress: z.string().min(2, {
      message: "Street address must be at least 2 characters.",
    }),
    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    zipCode: z.string().min(2, {
      message: "Zip code must be at least 2 characters.",
    }),
    country: z.string().min(2, {
      message: "Country must be at least 2 characters.",
    }),
    invoiceDate: z.string().min(2, {
      message: "Invoice date must be at least 2 characters.",
    }),
    paymentTerms: z.string().min(2, {
      message: "Payment terms must be at least 2 characters.",
    }),
    description: z.string(),
    items: z.array(invoiceItemsSchema).optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      streetAddress: "",
      city: "",
      zipCode: "",
      country: "",
      invoiceDate: "",
      paymentTerms: "",
      description: "",
      items: [{ name: "", quantity: 1, price: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const items = form.watch("items");
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <main>
      <div className="flex gap-3 items-center mb-4">
        <Link to="/invoices">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Heading title="New Invoice" description="Create a new invoice" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. john@doe.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. 12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex. USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="invoiceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. 2023-01-01" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a payment term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">Next 15 Days</SelectItem>
                        <SelectItem value="30">Next 30 Days</SelectItem>
                        <SelectItem value="60">Next 60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Ex. Lorem ipsum dolor sit amet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-1">
            <Label htmlFor="email" className="font-bold">Item List</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Item name</TableHead>
                  <TableHead className="text-center">Qty.</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>  
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={item.id} className="h-16">
                    <TableCell>
                      <Input {...form.register(`items.${index}.name` as const)} />
                    </TableCell>
                    <TableCell className="w-[100px]">
                      <Input
                        {...form.register(`items.${index}.quantity` as const)}
                        placeholder="0" type="number" min={1} max={99}
                      />
                    </TableCell>
                    <TableCell className="w-[100px]">
                      <Input
                        {...form.register(`items.${index}.price` as const)}
                        placeholder="0.00" type="number" min={0} max={999999.99}
                      />
                    </TableCell>
                    <TableCell className="text-right font-extrabold w-[100px]">
                      {
                        formatCurrency(String((items[index]?.quantity || 0) * (items[index]?.price || 0)))
                      }
                    </TableCell>
                    <TableCell className="w-[100px] text-center">
                      <Button variant="destructive" size="icon" type="button" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Button variant="outline" size="sm" className="w-full" type="button" onClick={() => append({ name: "", quantity: 1, price: 0 })}>
                      <Plus className="h-4 w-4" /> Add New Item
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          <Button type="submit" className="w-full">Save</Button>
        </form>
      </Form>

      <pre>{JSON.stringify(form.formState)}</pre>
    </main>
  )
}