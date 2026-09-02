import {
  Button,
  Divider,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { type RefObject } from 'react'
import { createEmptyProduct, DiscardGuard } from '@/components'
import { ClassificationRows } from './ClassificationRows'
import { GwpBlock } from './GwpBlock'
import { liveAssemblyGwp } from './liveGwp'
import { ProductSection } from './ProductSection'
import { unitSelectOptions } from './units'
import type { EditorAssemblyState, EditorProduct } from './types'

type AssemblyEditorProps = {
  state: EditorAssemblyState
  dirty: boolean
  allowLeaveRef?: RefObject<boolean>
  onChange: (state: EditorAssemblyState) => void
}

export const AssemblyEditor = ({ state, dirty, allowLeaveRef, onChange }: AssemblyEditorProps) => {
  const updateProduct = (index: number, product: EditorProduct) => {
    onChange({
      ...state,
      products: state.products.map((item, itemIndex) => (itemIndex === index ? product : item)),
    })
  }

  return (
    <Stack gap='xl'>
      <DiscardGuard dirty={dirty} allowLeaveRef={allowLeaveRef} />
      <GwpBlock label='Assembly GWP' value={liveAssemblyGwp(state)} />
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing='md'>
        <TextInput
          label='Name'
          radius='xl'
          value={state.name}
          onChange={(event) => onChange({ ...state, name: event.currentTarget.value })}
        />
        <NumberInput
          label='Quantity'
          radius='xl'
          min={0}
          value={state.quantity}
          onChange={(value) => onChange({ ...state, quantity: typeof value === 'number' ? value : 0 })}
        />
        <Select
          label='Unit'
          radius='xl'
          comboboxProps={{ radius: 0 }}
          data={unitSelectOptions}
          searchable
          value={state.unit || null}
          onChange={(value) => onChange({ ...state, unit: value ?? 'pcs' })}
        />
        <Textarea
          label='Description'
          radius='xl'
          autosize
          minRows={2}
          value={state.description}
          onChange={(event) => onChange({ ...state, description: event.currentTarget.value })}
        />
        <Textarea
          label='Comment'
          radius='xl'
          autosize
          minRows={2}
          value={state.comment}
          onChange={(event) => onChange({ ...state, comment: event.currentTarget.value })}
        />
        <ClassificationRows
          idPrefix='assembly'
          rows={state.classification}
          onChange={(classification) => onChange({ ...state, classification })}
        />
      </SimpleGrid>

      <Divider />
      <Group justify='space-between' align='flex-end'>
        <div>
          <Text>Composition</Text>
          <Title order={2}>Products</Title>
        </div>
        <Button
          variant='subtle'
          w='fit-content'
          onClick={() => onChange({ ...state, products: [...state.products, createEmptyProduct()] })}
        >
          Add product
        </Button>
      </Group>
      {state.products.length === 0 ? (
        <Text c='dimmed'>No products yet. Add a product to start attaching EPDs.</Text>
      ) : (
        <Stack gap={0}>
          {state.products.map((product, index) => (
            <div key={product.key}>
              <ProductSection
                index={index}
                product={product}
                onChange={(next) => updateProduct(index, next)}
                onRemove={() =>
                  onChange({
                    ...state,
                    products: state.products.filter((_, itemIndex) => itemIndex !== index),
                  })
                }
              />
              {state.products.length !== index + 1 && <Divider />}
            </div>
          ))}
        </Stack>
      )}
    </Stack>
  )
}
